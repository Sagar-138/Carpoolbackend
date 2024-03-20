// AutosuggestController.js

const fetch = require('node-fetch');

const getAutosuggestions = async (query, region, token) => {
  try {
    const response = await fetch(
      `https://atlas.mapmyindia.com/api/places/search/json?query=${query}&region=${region}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.suggestedLocations;
    } else {
      throw new Error('Failed to fetch suggestions');
    }
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    throw new Error('Failed to fetch suggestions');
  }
};

module.exports = { getAutosuggestions };
