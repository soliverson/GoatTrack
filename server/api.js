async function fetchGoatData() {
  try {
    const response = await fetch('https://api.api-ninjas.com/v1/animals?name=goat', {
      headers: {
        'X-Api-Key': process.env.API_NINJAS_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    // Process the JSON data
  } catch (error) {
    console.error('Fetch Error:', error);
    // Handle the error (e.g., show a user-friendly message)
  }
}
