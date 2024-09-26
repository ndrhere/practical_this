const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/products?directConnection=true'


async function connectToMongo () {
try{
await mongoose.connect(mongoURI);
console.log("Mongo connected successfully!")
}catch(error){
console.error("Error connection DB")
}
}


module.exports = connectToMongo;