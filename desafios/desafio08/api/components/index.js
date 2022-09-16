const router = require('express').Router();

router.use('/productos', require('./productos/router').router);
router.use('/mensajes', require('./mensajes/router').router);

module.exports = router;