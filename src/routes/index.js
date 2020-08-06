const express = require("express");
const serviceRoutes = require("./service.route");
const router = express.Router();
const swaggerDocument = require('../config/swagger.json'); 
const swaggerUi = require('swagger-ui-express');
router.use('/api',serviceRoutes);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const config = require("../config/config");
config.requestDate =  new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata'
});

router.use('*', async (req, res, next) => {
    return res
        .status(404)
        .json({
            statusCode: 404
        });
});

module.exports = router;
