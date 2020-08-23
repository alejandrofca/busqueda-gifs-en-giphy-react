Búsqueda de imagenes GIF usando la API de giphy.com usando React

El ejercicio sirve para aprender:

* Como está construida una SPA (Single Page Application) con React
* Entender el uso de los hooks de estado: useState, useRef, useEffect
* Entender la interacción entre componentes, pasando funciones como argumentos en los atributos JSX
* Entender el uso de handlers para capturar y procesar eventos en los componentes
* Desarrollada con React usando create-react-app, no requiere conocimiento de Webpack
* Debes crear o usar tu API KEY de giphy.com que se obtiene en https://developers.giphy.com y substituirla en App.js

En ambiente de pruebas, requiere:

* Requiere una API KEY de giphy.com. Si ya tiene una, vaya al siguiente paso, sino, obténgala en https://developers.giphy.com

En el shell de su preferencia, siga estos comandos:

* cd directorio_de_trabajo
* git clone https://github.com/alejandrofca/busqueda-gifs-en-giphy-react
* cd busqueda-gifs-en-giphy-react
* npm install
* Edite scr/App.js. Establezca su API KEY en la línea 11, así:
  const giphy_api_key = '__su_api_key__'
* npm start

Para producción:

* npm build

y cargue en su servidor web el contenido del directorio 'build' que se produce. 
