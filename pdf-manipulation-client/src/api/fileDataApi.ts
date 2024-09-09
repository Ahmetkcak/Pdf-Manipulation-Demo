import axios from 'axios';

const API_BASE_URL = 'https://localhost:7090/api/FileData';

interface HighlightArea {
    height: number;
    left: number;
    pageIndex: number;
    top: number;
    width: number;
}

interface Note {
    id: number;
    pdfFileId:number;
    content: string;
    highlightAreas: HighlightArea[];
    quote: string;
}

export const saveFileData = async (fileData: Note) => {

    try {
      const response = await axios.post(API_BASE_URL, fileData);
      return response.data;
    } catch (error) {
      console.error('Error uploading File Data:', error);
      throw error;
    }
  };

  export const getFileDataByFileId = async (fileId: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${fileId}`);
      return response.data;
    } catch (error) {
      console.error('Error uploading File Data:', error);
      throw error;
    }
  };