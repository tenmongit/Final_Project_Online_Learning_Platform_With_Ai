const API_BASE_URL = 'http://localhost:5000';

export const getStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/status`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching status:', error);
    throw error;
  }
};

export const callAI = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ai`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data || {})
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error calling AI:', error);
    throw error;
  }
};
