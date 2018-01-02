const express = require('express');
const morgan = require('morgan');
const http = require('http');
const bodyParser = require('body-parser');
const router = require('./router');
const mongoose = require('mongoose');
var cors = require('cors')

//db settings
mongoose.connect('mongodb://localhost:auth/auth');
mongoose.Promise = Promise;
mongoose.set('debug', true);

const app = express();

// app settings
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);
// server settings
const server = http.createServer(app);
const port = process.env.port || 3030;
server.listen(port);
console.log('Server is listening on a port:', port);