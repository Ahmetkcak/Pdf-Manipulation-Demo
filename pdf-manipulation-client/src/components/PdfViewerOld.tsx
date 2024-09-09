"use client";

import React, { useEffect, useState } from "react";
import { uploadPdfFile, getPdfFileById, deletePdfFileById, getAllFileName } from "@/api/fileApi";
import { Worker, Viewer, PrimaryButton, Button, Tooltip, Position } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { highlightPlugin, RenderHighlightContentProps, RenderHighlightTargetProps, RenderHighlightsProps, MessageIcon } from "@react-pdf-viewer/highlight";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import FileData from "./FileData";
import { getFileDataByFileId, saveFileData } from "@/api/fileDataApi";
import { saveHighlightArea } from "@/api/highlightAreaApi";
import Link from "next/link";

interface HighlightArea {
    height: number;
    left: number;
    pageIndex: number;
    top: number;
    width: number;
}

interface Note {
    id: number;
    pdfFileId: number;
    content: string;
    highlightAreas: HighlightArea[];
    quote: string;
}

interface ExtendedHighlightArea extends HighlightArea {
    fileDataId: number;
}

interface FileInfo {
    id: number;
    fileName: string;
}

const PdfViewerOld = () => {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [fileInputValue, setFileInputValue] = useState<string>("");
    const [notes, setNotes] = useState<Note[]>([]);
    const [message, setMessage] = useState<string>("");
    const [fileNames, setFileNames] = useState<FileInfo[]>([]);

    const noteEles: Map<number, HTMLElement> = new Map();

    useEffect(() => {
        getAllFileInfo();
    }, []);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            alert('Lütfen bir dosya seçin.');
            return;
        }

        try {
            await uploadPdfFile(file);
            alert('Dosya başarıyla yüklendi!');
            setPdfUrl(null);
            await getAllFileInfo();
        } catch (error) {
            console.error('Dosya yükleme hatası:', error);
            alert('Dosya yüklenirken bir hata oluştu.');
        }
    };

    const fetchPdfById = async (id: number) => {
        try {
            const blob = await getPdfFileById(id);
            const fileUrl = URL.createObjectURL(blob);
            setPdfUrl(fileUrl);
            fetchFileDataByFileId(id);
            setFileInputValue(id.toString());
            setNotes([]);
        } catch (error) {
            console.error('PDF dosyasını çekerken hata oluştu:', error);
            alert('PDF dosyası çekilirken bir hata oluştu.');
        }
    };

    const fetchFileDataByFileId = async (fileId: number) => {
        try {
            const res = await getFileDataByFileId(fileId);
            if (res == null || res == undefined || res.length <= 0) {
                setNotes([])
            }
            else {
                setNotes(res);
            }
        } catch (error) {
            console.error('File data error', error);
            alert('File data error');
        }
    };

    const handleFetchPdf = () => {
        const id = parseInt(fileInputValue);
        if (!isNaN(id)) {
            fetchPdfById(id);
        }
    };

    const deletePdfById = async (id: number) => {
        try {
            await deletePdfFileById(id);
            alert("Dosya başarıyla silindi.");
            setPdfUrl(null);
        } catch (error) {
            console.error('PDF dosyasını silerken hata oluştu:', error);
            alert('PDF dosyası silinirken bir hata oluştu.');
        }
    };

    const getAllFileInfo = async () => {
        try {
            const res = await getAllFileName();
            setFileNames(res);
        } catch (error) {
            alert('Dosyalar getirilirken hata oluştu');
        }
    };

    const handleDeletePdf = () => {
        const id = parseInt(fileInputValue);
        if (!isNaN(id)) {
            deletePdfById(id);
        }
    };

    const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFileInputValue(event.target.value);
    };

    const renderHighlightTarget = (props: RenderHighlightTargetProps) => {
        return (
            <div
                style={{
                    background: "#eee",
                    display: "flex",
                    position: "absolute",
                    left: `${props.selectionRegion.left}%`,
                    top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
                    transform: "translate(0, 8px)",
                    zIndex: 1,
                }}
            >
                <Tooltip
                    position={Position.TopCenter}
                    target={
                        <Button onClick={props.toggle}>
                            <MessageIcon />
                        </Button>
                    }
                    content={() => <div style={{ width: "100px" }}>Add a note</div>}
                    offset={{ left: 0, top: -8 }}
                />
            </div>
        );
    };

    const renderHighlightContent = (props: RenderHighlightContentProps) => {
        const addNote = async () => {
            if (message !== "") {
                const note: Note = {
                    id: 0,
                    pdfFileId: Number(fileInputValue),
                    content: message,
                    highlightAreas: props.highlightAreas,
                    quote: props.selectedText
                };
                setNotes(notes.concat([note]));
                const res = await saveFileData(note);
                const extendedHighlightAreas: ExtendedHighlightArea[] = props.highlightAreas.map(area => ({
                    ...area,
                    fileDataId: res.id
                }));
                await saveHighlightArea(extendedHighlightAreas);
                props.cancel();
            }
        };
        return (
            <div
                style={{
                    background: "#fff",
                    border: "1px solid rgba(0, 0, 0, .3)",
                    borderRadius: "2px",
                    padding: "8px",
                    position: "absolute",
                    left: `${props.selectionRegion.left}%`,
                    top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
                    zIndex: 1,
                }}
            >
                <div>
                    <textarea
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded"
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                </div>
                <div className="flex justify-center mt-2 space-x-8">
                    <button onClick={addNote} className="w-20 text-sm text-white bg-pink-500 rounded-3xl ring-1 py-2 px-4">Add</button>
                    <button onClick={props.cancel} className="w-20 text-sm text-pink-500 bg-white rounded-3xl ring-1 ring-pink-500 py-2 px-4">Cancel</button>
                </div>
            </div>
        );
    };
    const jumpToNote = (note: Note) => {
        if (noteEles.has(note.id)) {
            const noteElement = noteEles.get(note.id);
            if (noteElement) {
                noteElement.scrollIntoView();
            }
        }
    };

    const renderHighlights = (props: RenderHighlightsProps) => (
        <div>
            {notes.map((note) => (
                <React.Fragment key={note.id}>
                    {note.highlightAreas
                        .filter((area) => area.pageIndex === props.pageIndex)
                        .map((area, idx) => (
                            <div
                                key={idx}
                                style={Object.assign(
                                    {},
                                    {
                                        background: "yellow",
                                        opacity: 0.4,
                                    },
                                    props.getCssProperties(area, props.rotation),
                                )}
                                onClick={() => jumpToNote(note)}
                                ref={(ref): void => {
                                    noteEles.set(note.id, ref as HTMLElement);
                                }}
                            />
                        ))}
                </React.Fragment>
            ))}
        </div>
    );

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const highlightPluginInstance = highlightPlugin({
        renderHighlightTarget,
        renderHighlightContent,
        renderHighlights,
    });

    return (
        <div className="flex flex-row w-full">
            {/* LEFT: Files section */}
            <div className="flex-none w-[20%] p-4 mt-10">
                <h1 className="font-extrabold text-2xl text-center">My Files</h1>
                <div className="flx flex-col">
                    {fileNames.map((fileName) => (
                        <Link className="flex" key={fileName.id} href="" onClick={() => fetchPdfById(fileName.id)}>
                            {fileName.fileName}
                        </Link>
                    ))}
                </div>
            </div>

            {/* MIDDLE: Main section for PDF Viewer */}
            <div className="flex-grow w-[50%] bg-white p-4 overflow-hidden">
                <div className="flex items-center">
                    <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">
                        Upload File
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                    <input
                        type="number"
                        value={fileInputValue}
                        onChange={handleIdChange}
                        className="p-2 ml-2 border rounded"
                        placeholder="PDF ID girin"
                    />
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded ml-2 hover:bg-green-600"
                        onClick={handleFetchPdf}
                    >
                        Get By File Id
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600"
                        onClick={handleDeletePdf}
                    >
                        Delete By File Id
                    </button>
                </div>
                {pdfUrl && (
                    <div className="w-full h-[92vh] overflow-auto">
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                            <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance, highlightPluginInstance]} />
                        </Worker>
                    </div>
                )}
            </div>

            {/* RIGHT: FileData section */}
            <div className="flex-none w-[25%] p-4">
                <FileData notes={notes} />
            </div>
        </div>
    );
};

export default PdfViewerOld;
