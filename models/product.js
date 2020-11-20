const {Schema, model} = require('mongoose');

const product = new Schema({
    title: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        required: true
    },
    img: String
})

module.exports = model("Product", product);