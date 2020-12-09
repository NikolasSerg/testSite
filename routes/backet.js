const {Router} = require('express');
const router = Router();
// const backet = require('../models/backet');
const colors = require('colors');

colors.setTheme({
  info: 'bgGreen',
  help: 'cyan',
  warn: 'yellow',
  success: 'bgBlue',
  error: 'red'
});



router.post('/', async (req, res) => {
    console.log(req.body, ' - req.body in backet'.red.bgBlue);
    console.log(typeof req.body, ' - typeof req.body');
   
    let backetId = await backet.getId(req.body.id);
    // console.log(backetId, ' - backetId'.bgGreen.error);
    // console.log(backetId.length, '- backetId.length');

    if(backetId.length == 0) {
        // console.log(backetId.length, ' - backetId.length');
        let newSave = req.body;
        // console.log(newSave,  ' - newSave');
        newSave.count = 1;
        let url = newSave.img;
        // console.log(url, ' - url');
        // console.log(typeof url, ' - typeof url');

        let urlSlice = url.slice(5);
        let urlNew = "/img/"+"backet/"+urlSlice;
        newSave.img = urlNew;
        newSave.price = +newSave.price;
        newSave.sum = +newSave.price;
        await backet.save(newSave);
    } else {
        backetId[0].count += 1;
        backetId[0].sum = backetId[0].price * backetId[0].count;
        backet.save(backetId[0], ' - backetId');
    }

    // // res.redirect('/posts');
    res.send('{"all": "ok"}');
});

router.get('/', async (req, res) => {
    const user = await req.user
    .populate('cart.items.productId')
    .execPopulate();

    console.log(user , ' - user in backet');
    console.log(user.cart.items , ' - user.cart.items in backet');

    const data = user.item.productId

    const sumAll = 0
    const mapData = data.map((i) => {
        
    })

    // let data = await backet.getAll();
    // console.log(data.length, ' - data.length');
    // let sumAll;
    // if(data.length !== 0) {
    //     sumAll = data.reduce((pre, cur) => 
    //         pre.sum + cur.sum
    //     );
    // } else {
    //     sumAll = 0;
    // }
    // console.log(sumAll, ' - sumAll'.red.bgBlue);
    // // console.log(typeof data, ' - typeof data');
    // // console.log(data.length, ' - data.length');
    // console.log(data, ' - backet'.red.bgBlue);
    res.render('backet', {
        data,
        sumAll
    });
})

router.delete('/del/:id', (req, res) => {
    let data = backet.del(req.params.id);
    res.status(200).json(data);
})

module.exports = router;