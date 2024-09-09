import axios from "axios";

const API_BASE_URL = 'https://localhost:7090/api/HighlightArea';

interface HighlightArea {
    height: number;
    left: number;
    pageIndex: number;
    top: number;
    width: number;
}

export const saveHighlightArea = async (highlightAreas: HighlightArea[]) => {

    try {
      const response = await axios.post(API_BASE_URL, highlightAreas);
      return response.data;
    } catch (error) {
      console.error('Error uploading File Data:', error);
      throw error;
    }
  };