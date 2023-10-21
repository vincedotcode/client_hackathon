export default async function fetchRecruits() {
    const url = 'http://localhost:3001/recruits/getAll';
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': '*/*'
        }
      });
      if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }