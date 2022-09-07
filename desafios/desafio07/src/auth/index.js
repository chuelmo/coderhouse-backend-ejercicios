const ADMINISTRADOR = true;
const USUARIO = false;

function checkRouteProducts(req, res, next) {
    if (!(ADMINISTRADOR || USUARIO)) { //No permito a un usuario anónimo consumir la API
        res.status(403).json({'error': 403, 'description': 'Ruta ' + req.originalUrl + ' método ' + req.method + ' no autorizada'});
    } else if (ADMINISTRADOR) { //El administrador puede consumir todos los ENDPOINTS
        next();
    } else if (req.method === 'GET') { //El usuario "logueado" puede consultar
        next();
    } else { //El usuario "logueado" no puede borrar, ni modificar ni insertar productos
        res.status(403).json({'error': 403, 'description': 'Ruta ' + req.originalUrl + ' método ' + req.method + ' no autorizada'});
    }
};

function checkRouteCarrito(req, res, next) {
    if (!(ADMINISTRADOR || USUARIO)) {
        res.status(403).json({'error': 403, 'description': 'Ruta ' + req.originalUrl + ' método ' + req.method + ' no autorizada'});
    } else {
        next();
    }
};

module.exports = {
    checkRouteProducts,
    checkRouteCarrito
};
