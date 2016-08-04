import express from 'express';
import homeController from './controllers/home';

const app = express();

app.get('/', homeController.get);

app.listen(process.env.PORT || 5000, () => {
  console.log('Saude em Foco API running at port 5000...');
});
