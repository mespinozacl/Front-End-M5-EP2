# Front-End-M5-EP2

npm create vite@latest
cd m5-ep2
npm install typescript ts-loader webpack webpack-cli --save-dev
npm install react-router-dom
npm install axios
npm install crypto-js
npm i --save-dev @types/crypto-js
npm install json-server
npm run server
npm run dev


Acciones de seguridad:
Emplear y configurar los props.
Se empleo crypto-js para encriptar la data.

Protección contra Cross-Site Scripting (XSS): 
React escapa los valores de las props y el contenido de texto de forma predeterminada, lo que significa que los caracteres especiales se convierten en entidades HTML antes de renderizarlos en el DOM. Esto evita que el código malicioso se ejecute en el navegador del usuario.
No uso dangerouslySetInnerHTML 
No hay mucho mas adicional que hacer. 

Protección contra Clickjacking: 
Es necesaria una configuracion en el servidor

Protección contra inyección de SQL:
No aplica, el codigo no emplea query sql, no hay nada que parchar

Protección contra denegación de servicio (DoS): Hay acciones en el servidor que se pueden realizar.

