import express from 'express';
import mongoose from 'mongoose';
import homeController from './controllers/home';

const app = express();

mongoose.connect('mongodb://saudeemfocoadmin:root@ds153815.mlab.com:53815/saudeemfoco');

const occurrencesSchema = new mongoose.Schema({
  title: { type: String, required: true }
});

const occurrence = mongoose.model('occurrences', occurrencesSchema);

const saveOccurrences = (req, res) => {
  const occur = new occurrence({ title: 'Teste 2' });

  occur.save((error, o) => {
    if (error) {
      res.send(500);
    }

    res.send('Saved!');
  });
};

app.get('/', homeController.get);
app.get('/occurrences', saveOccurrences);

app.listen(process.env.PORT || 5000, () => {
  console.log('Saude em Foco API running at port 5000...');
});
