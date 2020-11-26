const { mongo } = require("mongoose");

const {model, Schema} = require('mongoose');

const user = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cart: {
        item: [
            {
                count: {
                    type: Number,
                    require: true,
                    default: 1
                },
                courseId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    require: true 
                }
            }
        ]
    }
});

