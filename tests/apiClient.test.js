const {
    fetchWithError,
    fetchWithHeadersAndParams,
    fetchMockedData
  } = require('../tasks/apiClient');
  const axios = require('axios');
  
  jest.mock('axios');
  
  // task 1
  test('fetchWithError should return "Resource not found" for 404', async () => {
    axios.get.mockRejectedValueOnce({ response: { status: 404 } });
    const result = await fetchWithError();
    expect(result).toBe('Resource not found');
  });
  
  // task 2
  test('fetchWithHeadersAndParams should include custom headers and params', async () => {
    axios.get.mockResolvedValueOnce({
      config: {
        headers: { 'x-custom-header': 'myHeaderValue' },
        params: { userId: 1 }
      }
    });
    const config = await fetchWithHeadersAndParams();
    expect(config.headers['x-custom-header']).toBe('myHeaderValue');
    expect(config.params.userId).toBe(1);
  });
  
  // task 3: success
  test('fetchMockedData should return mocked data (success)', async () => {
    axios.get.mockResolvedValueOnce({ data: { message: 'Success' } });
    const result = await fetchMockedData();
    expect(result).toEqual({ message: 'Success' });
  });
  
  // task 3: error
  test('fetchMockedData should handle error (failure)', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network error'));
    await expect(fetchMockedData()).rejects.toThrow('Network error');
  });
  