const { Schema, model, models } = require('mongoose');

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
        items: [{
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                // sumAll: {
                //     type: Number,
                //     required: true
                // },
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                }
            }

        ]
    }
});


userSchema.methods.addCart = function(product) {
    const items = [...this.cart.items];
    const idx = items.findIndex(c => {
        return c.productId.toString() === product._id.toString()
    })
    if (idx >= 0) {
        items[idx].count = items[idx].count + 1;
        // console.log(items[idx], ' - items[idx]');
        // items[idx].sumAll = items[idx].sumAll + items[idx].price;
    } else {
        items.push({
            count: 1,
            productId: product._id
        })
    }
    this.cart = { items }
    return this.save()
};

userSchema.methods.minusItemCart = function(product) {
    const items = [...this.cart.items];
    const idx = items.findIndex(c => {
        return c.productId.toString() === product.id.toString()
    })
    if(idx >= 0) {
        items[idx].count = items[idx].count - 1;
        console.log(items[idx].count, '- items.count');
    }
    this.cart = { items };
    console.log('MINUS USER');
    return this.save()
};

userSchema.methods.addItemCart = async function(product) {
    const items = [...this.cart.items];
    const idx = await items.findIndex(c => {
        return c.productId.toString() === product.id.toString()
    })
    if(idx >= 0) {
        items[idx].count = items[idx].count + 1;
        console.log(items[idx].count, '- items.count');
    }
    this.cart = { items };
    console.log('ADD USER');
    return this.save()
};


module.exports = model('User', userSchema);