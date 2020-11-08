const {Router} = require('express');
const router = Router();
const backet = require('../models/backet');
const colors = require('colors');
const Product = require('../models/product');

colors.setTheme({
  info: 'bgGreen',
  help: 'cyan',
  warn: 'yellow',
  success: 'bgBlue',
  error: 'red'
});

router.post('/', async (req, res) => {
    // console.log(req.body, ' - req.body in backet'.red.bgBlue);
    // console.log(typeof req.body, ' - typeof req.body');
    // console.log(typeof req.body.id, ' - typeof req.body.id'.red.bgGreen);
    // console.log(req.body.id, ' - req.body.id'.red.bgBlue);
   
    let backetId = await backet.getId(req.body.id);

    console.log(backetId, ' - backetId'.bgGreen.error);

    // console.log(backetId.length, '- backetId.length');

    let product = await Product.getId(req.body.id);

    console.log(product,' - product'.bgGreen.error);

    if(backetId.length === 0) {
        
        // console.log(product, ' - product in backet router'.green.bgYellow);
        // console.log(backetId.length, ' - backetId.length');
        // let newSave = req.body;
        // console.log(newSave,  ' - newSave');
        product.count = 1;
        // newSave.sum = req.body.price
        // let url = newSave.img;
        product.sum = product.price;
        // console.log(url, ' - url');
        // console.log(typeof url, ' - typeof url');

        let urlSlice = product.img.slice(5);
        let urlNew = "/img/"+"backet/"+urlSlice;
        product.img = urlNew;
        backet.save(product);
        console.log(product, ' - product send ti save'.bgGreen.error);
    } else {
        console.log("ELSE ROUTER DONE-----------------------------------------------");
        backetId.count += 1;
        console.log(backetId.count, ' /////////////////////// backetId.count');
        backetId.sum = backetId.price * backetId.count;
        console.log(backetId.sum,' /////////////////////////- backetId.sum');

        console.log(backetId.sum, ' - product.sum in backet router'.bgGreen.error);

        // backetId[0].count += 1;
        // backetId[0].sum = backetId.price * backetId
        backet.save(backetId);
        console.log(backetId, ' - product send to save else'.bgGreen.error);
    }

    // // res.redirect('/posts');
    res.send('{"all": "ok"}');
});

router.get('/', async (req, res) => {
    // console.log('__________________________________________________________________________-');
    let data = await backet.getAll();
    let sum = await backet.getSum(data);
    // console.log(sum, ' - sum');
    // console.log(typeof data, ' - typeof data');
    // console.log(data.length, ' - data.length');
    // console.log(data, ' - backet');
    res.render('backet', {
        data
    });

})


router.get('/:id', async (req, res) => {
    let product = await Product.getId(req.params.id);
    res.render('post', {
        title: product.title,
        product: product
    })
})



module.exports = router;