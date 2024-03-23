// AutosuggestRoute.js

const express = require('express');
const router = express.Router();
const { getAutosuggestions } = require('../controllers/AutosuggestController');

router.get('/', async (req, res) => {
  try {
    const { query, region, token } = req.query;
    const suggestions = await getAutosuggestions(query, region, token);
    res.json(suggestions);
  } catch (error) {
    console.error('Error handling Autosuggest request:', error);
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
});

module.exports = router;


