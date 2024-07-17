const express = require('express');
const { getAuthToken } = require('../auth');
const router = express.Router();

router.get('/token', async (req, res) => {
    try {
        const token = await getAuthToken();
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get token' });
    }
});

module.exports = router;
