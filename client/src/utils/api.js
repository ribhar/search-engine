export const getData = async (page = 1, limit = 6, searchTerm = '', sortBy = '', setData) => {
    try {
      const response = await fetch(`http://localhost:8080/search?page=${page}&limit=${limit}&query=${searchTerm}&sortBy=${sortBy}`);
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.error('Error fetching data:', response.status, response.statusText);
        // Handle error case if needed
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      // Handle error case if needed
    }
  };
  