import { NextFunction, Request, Response } from 'express';
import index from './routes';
import users from './routes/users';

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connect = require('./mongo');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

connect();

app.use('/', index);
app.use('/users', users);

app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error('Not Found');

  next({ ...err, status: 404 });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
