const router = require('express').Router();

router.use('/productos', require('./productos').router);

module.exports = router;