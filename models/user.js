const {Schema, model, models} = require('mongoose');

const userSchema = new Schema({
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


userSchema.method.addCart = function(product) {
    const items = [...this.cart.items];
    const idx = items.findIndex(c => {
        return c.productId.toString() === product._id.toString()
    })
    if(idx >= 0) {  
        items[idx].count = item[idx].count + 1; 
    } else {
        items.push({
            count: 1,
            productId: product._id
        })
    }
    this.cart = {items}
    return this.save()
}

module.exports = model('User', userSchema);