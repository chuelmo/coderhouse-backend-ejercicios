const router = require('express').Router();

router.use('/productos', require('./productos').router);
router.use('/mensajes', require('./mensajes').router);

module.exports = router;