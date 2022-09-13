Creación del proyecto: pasos


Desarrollaremos un proyecto en el cual integraremos un servidor en node.js con Webpack y Typescript vinculados, que permitirán importar nuestros módulos CommonJS y ES Modules.
Vamos a seguir esta serie de pasos para crear el proyecto desde cero
1) Generamos la carpeta de proyecto
2) Inicializamos un proyecto de node con npm init -y
3) Dentro del proyecto creamos un carpeta src con un archivo index.ts.
4) Instalamos las dependencias de desarrollo:
npm i -D typescript ts-loader webpack webpack-cli
	webpack-node-externals

npm i -D typescript ts-loader webpack webpack-cli webpack-node-externals

5) Instalamos las dependencias del proyecto:
npm i express @types/express
6) Creamos el archivo tsconfig.json (configuración del transpilador typescript) con el comando ./node_modules/.bin/tsc --init
7) Modificamos tsconfig.json dejando la clave "noImplicitAny" en false (deshabilita la generación de errores en expresiones y declaraciones con cualquier tipo implícito)
8) Creamos el archivo webpack.config.js y le agregamos el siguiente contenido:
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
   mode: 'production',
   entry: './src/index.ts',
   target: "node",
   externals: [nodeExternals()],

   output: {
       path: path.resolve(__dirname, 'dist'),
       filename: 'main.js',
   },
   resolve: {
       extensions: ['.ts', '.js'],
   },
   module: {
       rules: [
           {
               test: /\.tsx?/,
               use: 'ts-loader',
               exclude: /node_modules/
           }
       ]
   }
}

9) En el archivo package.json agregamos lo comentado
{
 "name": "ejercicio2",
 "version": "1.0.0",
 "description": "",
 "main": "dist/main.js",  //esto
 "scripts": {
   "build": "webpack", //esto 
   "start": "node ."  //esto
 },
 "keywords": [],
 "author": "",
 "license": "ISC",
 "devDependencies": {
   "ts-loader": "^8.0.17",
   "typescript": "^4.1.5",
   "webpack": "^5.53.0",
   "webpack-cli": "^4.8.0",
   "webpack-node-externals": "^3.0.0"
 },
 "dependencies": {
   "@types/express": "^4.17.11",
   "express": "^4.17.1"
 }
}
