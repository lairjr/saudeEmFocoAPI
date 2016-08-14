import express from 'express';
import homeController from './controllers/home';
import mongoose from 'mongoose';

const app = express();

mongoose.connect(process.env.MONGODB_URI);

app.get('/', homeController.get);

app.listen(process.env.PORT || 5000, () => {
  console.log('Saude em Foco API running at port 5000...');
});
