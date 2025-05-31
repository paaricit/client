import httpClient from '../utils/httpClient';

export const getAssignments = async () => {
  try {
    const res = await httpClient.get('/assignments');
    return res.data;
  } catch (err) {
    let msg = 'Failed to fetch assignments';
    if (err.response && err.response.data && err.response.data.message) {
      msg = err.response.data.message;
    } else if (err.message) {
      msg = err.message;
    }
    throw new Error(msg);
  }
};

export const uploadAssignment = async (assignment) => {
  try {
    const formData = new FormData();
    Object.entries(assignment).forEach(([key, value]) => {
      if (value !== undefined && value !== null) formData.append(key, value);
    });
    const res = await httpClient.post('/assignments', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch (err) {
    let msg = 'Failed to upload assignment';
    if (err.response && err.response.data && err.response.data.message) {
      msg = err.response.data.message;
    } else if (err.message) {
      msg = err.message;
    }
    throw new Error(msg);
  }
}; 