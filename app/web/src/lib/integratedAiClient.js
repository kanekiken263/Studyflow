const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const integratedAiClient = {
  stream: async (endpoint, { body, signal, images = [] }) => {
    const formData = new FormData();
    formData.append('message', JSON.stringify(body.message));
    images.forEach((img, i) => formData.append(`image_${i}`, img));

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      body: formData,
      signal,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response;
  },
};