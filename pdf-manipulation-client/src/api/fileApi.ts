import axios from 'axios';

const API_BASE_URL = 'https://localhost:7090/api/Pdfs';

export const uploadPdfFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(API_BASE_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading PDF:', error);
    throw error;
  }
};

export const getPdfFileById = async (id: number): Promise<Blob> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching PDF file:', error);
    throw error;
  }
};


export const deletePdfFileById = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching PDF file:', error);
    throw error;
  }
};

export const getAllFileName = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching PDF file:', error);
    throw error;
  }
};
