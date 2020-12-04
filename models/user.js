const {Schema, model, models} = require('mongoose');

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                }
            }
            
        ]
    }
});


module.exports = model('User', user);