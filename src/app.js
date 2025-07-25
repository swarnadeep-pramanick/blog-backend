const express = require('express');
const bodyParser = require('body-parser');
const corsMiddleware = require('./middleware/corsMiddleware');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');
const authRouter = require('./auth/auth.route');
const postsRouter = require('./posts/posts.route');
require('dotenv').config();

const app = express();
const rootDir = path.join(__dirname, '..');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(corsMiddleware);
app.use('/uploads', express.static(path.join(rootDir, 'uploads')));

app.get('/', (req, res) => {
  res.json({ message: 'Blog API is running!' });
});

app.use('/auth', authRouter);
app.use('/posts', postsRouter);

app.use(errorHandler);


module.exports = app; 