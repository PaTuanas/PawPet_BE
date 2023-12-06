const express = require('express')
const morgan = require('morgan')    
const mongoose = require('mongoose')


const app = express()
const port = 3000

app.use(morgan('combined'))
app.get('/h', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

mongoose.connect('mongodb+srv://PawPet:PawPet123@cluster0.m0l2tgt.mongodb.net/PawPet_DB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Connect db err:', err);
});

db.once('open', () => {
  console.log('CONNECTED MONGOODB');
});