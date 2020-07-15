// "path" to prepare path
// "express" server. Install it via npm
const path = require('path');
const express = require('express');

const app = express();

// It serves the static files from "dist" path
app.use(express.static(path.join(__dirname, 'dist')));

// very important for heroku where port is assigned dynamically from its env else use default
// app.set('port', process.env.PORT || 8080);
const PORT = process.env.PORT || 8080;
// const server = app.listen(app.get('port'), () => {
//   console.log('listening on port ', server.address().port);
// });
app.listen(PORT);
