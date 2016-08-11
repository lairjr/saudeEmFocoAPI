import express from 'express';
import mongoose from 'mongoose';
import homeController from './controllers/home';

const app = express();

mongoose.connect(process.env.MONGODB_URI);

const occurrencesSchema = new mongoose.Schema({
  title: { type: String, required: true }
});

const occurrence = mongoose.model('occurrences', occurrencesSchema);

const saveOccurrences = (req, res) => {
  const occur = new occurrence({ title: 'Teste 2' });

  const savePromise = occur.save();

  savePromise.then(
    (o) => {
      res.send('Saved!');
    },
    (e) => {
      res.send(500);
    }
  );
};

app.get('/', homeController.get);
app.get('/occurrences', saveOccurrences);

app.listen(process.env.PORT || 5000, () => {
  console.log('Saude em Foco API running at port 5000...');
});
