const axios = require('axios');

// task1 
async function fetchWithError() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/invalid-url');
    return response.data;
  } catch (error) {
    return error.response?.status === 404 ? 'Resource not found' : 'Unknown error';
  }
}

// task2
async function fetchWithHeadersAndParams() {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
    headers: {
      'x-custom-header': 'myHeaderValue'
    },
    params: {
      userId: 1
    }
  });
  return response.config;
}

// task3
async function fetchMockedData() {
  const response = await axios.get('/mocked-endpoint');
  return response.data;
}

module.exports = {
  fetchWithError,
  fetchWithHeadersAndParams,
  fetchMockedData
};
