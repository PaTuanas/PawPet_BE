const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors');

const main = require("./routes/mainRoute");
const customerRoutes = require("./routes/customerRoute");
const petRoutes = require("./routes/petRoute");
const productRoutes = require("./routes/productRoute");
const cartRoutes = require("./routes/cartRoute");
const orderRoutes = require("./routes/orderRoute");
const rateRoutes = require("./routes/rateRoute");

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3001
app.use(cors());

app.use(morgan('combined'))
app.get('/h', (req, res) => {
  res.send('Hello World!')
})

mongoose.connect('mongodb+srv://PawPet:PawPet123@cluster0.m0l2tgt.mongodb.net/PawPet_DB?retryWrites=true&w=majority');


const db = mongoose.connection;

db.on('error', (err) => {
  console.log('Connect db err:');
});

db.once('open', () => {
  console.log('CONNECTED MONGOODB');
});

app.use('/v1/main', main);
app.use('/v1/customers', customerRoutes);
app.use("/v1/pet", petRoutes);
app.use('/v1/product', productRoutes);
app.use('/v1/cart', cartRoutes);
app.use('/v1/rate', rateRoutes);
app.use('/v1/order', orderRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})