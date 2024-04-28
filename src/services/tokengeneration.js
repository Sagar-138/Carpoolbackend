// generateToken.js: This module is responsible for generating an access token for the MapMyIndia API.

const axios = require('axios');

// Async function to generate a token
async function generateToken() {
  // Define the required constants
  const clientId = process.env.MAPMYINDIA_CLIENT_ID; 
  const clientSecret = process.env.MAPMYINDIA_CLIENT_SECRET; 
  const tokenUrl = 'https://outpost.mappls.com/api/security/oauth/token'; 

  // Combine the client ID, secret, and URL, then encode them to Base64
  const combinedCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    // Send a POST request to the token URL
    const response = await axios.post(tokenUrl, null, {
      headers: {
        Authorization: `Basic ${combinedCredentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {
        grant_type: 'client_credentials' // Example grant_type, adjust as per your API
      }
    });

    // Extract the access token from the response data
    const token = response.data;
    console.log('Generated Token:', token);
    return token; // Return the generated token
  } catch (error) {
    console.error('Error generating token:', error.message);
    throw error; // Re-throw the error to be handled in the calling code
  }
}

module.exports = generateToken;