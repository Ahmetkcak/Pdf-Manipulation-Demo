"use client";

import React from 'react';

interface HighlightArea {
  height: number;
  left: number;
  pageIndex: number;
  top: number;
  width: number;
}

interface Note {
  id: number;
  content: string;
  highlightAreas: HighlightArea[];
  quote: string;
}


const FileData = ( {notes}: {notes:Note[]} ) => {

  return (
    <div className='flex flex-col ml-6 mt-10 overflow-y-scroll h-[92vh]'>
      <h2 className='text-2xl font-extrabold'>COMMENTS</h2>
      {notes?.length === 0 ? (
        <p>No comments available.</p>
      ) : (
        notes?.map(note => (
          <div key={note.id} className="border-b rounded-xl p-4 border-gray-300 mt-2 bg-gray-200 py-2 hover:cursor-pointer">
            <h3 className="font-semibold">{note.quote}</h3>
            <p>{note.content}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default FileData;