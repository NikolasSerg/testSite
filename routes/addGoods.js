const { Router } = require('express');
const router = Router();
const Product = require('../models/goods');

router.get('/', (req, res) => {
    res.status(200);
    res.render('addGoods', {
        title: "Add product"
    });
});

router.post('/', async (req, res) => {
    console.log(req.body, ' -req.body');
    console.log(req.body[0], ' - req.body[0]');
    console.log(req.body[1], ' -req.body[1]');
    console.log(typeof req.body, ' - typeof req.body');
   
    // console.log(req.body.forEach(element => {
    //     console.log(element, " - element in for each");
    // }));
    // const product = new Product(req.body.title, req.body.price, req.body.img);
    function splitReqBody(object) {
        console.log(object, ' - in func');
        let rezall = {};
        for (const key in object) {
            console.log(key)
            console.log(object[key])
            if (obj1[key] !== "title") {
                rezall[key] = object[key];
                console.log(rezall);
            }
        }
        return rezall;
    }
    splitReqBody(req.body);
    const product = new Product(req.body.title, req.body.price, req.body.img);
    await product.save('dataGoods');
    res.redirect('/posts');
});

module.exports = router; 


