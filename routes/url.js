const express = require('express');
const { handleCreateUrl, handleGetShortUrl, handleAnalytics } = require('../controllers/url');

const router= express.Router();

router.post('/',handleCreateUrl);

router.get('/analytics/:shortId',handleAnalytics);

router.get('/:shortId',handleGetShortUrl);



module.exports = router;