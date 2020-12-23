const {Router} = require('express');
const router = Router();
const colors = require('colors');

colors.setTheme({
  info: 'bgGreen',
  help: 'cyan',
  warn: 'yellow',
  success: 'bgBlue',
  error: 'red'
});
function cartItems(cart) {
    return cart.items.map( i => ({
        ...i.productId._doc, count: i.count
    }))   
}


// router.post('/', async (req, res) => {
//     let cartId = await cart.getId(req.body.id);

//     if(cartId.length == 0) {
//         let newSave = req.body;
//         newSave.count = 1;
//         let url = newSave.img;

//         let urlSlice = url.slice(5);
//         let urlNew = "/img/"+"cart/"+urlSlice;
//         newSave.img = urlNew;
//         newSave.price = +newSave.price;
//         newSave.sum = +newSave.price;
//         await cart.save(newSave);
//     } else {
//         cartId[0].count += 1;
//         cartId[0].sum = cartId[0].price * cartId[0].count;
//         cart.save(cartId[0], ' - cartId');
//     }

//     res.send('{"all": "ok"}');
// });

router.get('/', async (req, res) => {
   const user = await req.user
   .populate('cart.items.productId')
   .execPopulate();

//    console.log(user, ' - USER');
   let data = await cartItems(user.cart);
    sumAll = 0;

// console.log(data, " - DATA");

    res.render('cart', {
        data,
        sumAll
    });
})

router.post('/', async (req, res) => {
    // console.log(req.body, ' - PUT http request') ;
    console.log('РОУТЕР');
    if(req.body.type === 'add'){
        console.log('TYPE ADD');
        await req.user.addItemCart(req.body);
    } else if(req.body.type === 'minus') {
        console.log('TYPE MINUS');
        await req.user.minusItemCart(req.body);
    }
    res.redirect('/cart');
})

router.delete('/del/:id', (req, res) => {
    let data = cart.del(req.params.id);
    res.status(200).json(data);
})

module.exports = router;