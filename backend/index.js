const express = require('express');
const app = express();
var cors = require('cors');
const connectToMongo = require('./db');
connectToMongo();
const PORT = 3000;
const ProductRoute = require('./routes/ProductRoutes')
app.use(express.json());
app.use(cors());

app.use('/product', ProductRoute)

// app.get('/', (req, res) => {
//     res.send('Welcome to the Product API!');
// })

app.listen(PORT, () => {
    console.log(`App is listening at the port ${PORT}`)
})



