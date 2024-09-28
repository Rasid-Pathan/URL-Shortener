const express = require('express');
const {HandleGenerateNewShortUrl, HandleGetAnaltics, fetchUpdatedURLs} = require('../controller/url');

const router = express.Router();

router.post('/',HandleGenerateNewShortUrl);

router.get('/analytics/:shortId',HandleGetAnaltics);

router.get('/updatedUrls', fetchUpdatedURLs);

module.exports = router