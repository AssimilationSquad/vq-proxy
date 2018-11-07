const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const port = process.env.PORT || 3000;

const Book = 'http://localhost:3001';
const Reviews = 'http://localhost:3002';
const Similar = 'http://localhost:3003';
const Grid = 'http://localhost:3004';

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public')));

app.use('/rooms', express.static(path.join(__dirname, './public')));
app.get('/rooms/:roomId', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});

app.all('/rooms/:homeid/reviews', (req, res) => {
  apiProxy.web(req, res, {target: Reviews});
});

app.all('/similar/rooms/:id', (req, res) => {
  apiProxy.web(req, res, { target: Similar });
});

app.all('/api/rooms/:roomId', (req, res) => {
  apiProxy.web(req, res, {target: Grid});
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});


