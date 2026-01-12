const express = require('express');
const { handleCreateUrl, handleGetShortUrl, handleAnalytics } = require('../controllers/url');

const router= express.Router();

router.post('/',handleCreateUrl);

router.get('/:shortId',handleGetShortUrl);

router.get('/analytics/:shortId',handleAnalytics);

module.exports = router;