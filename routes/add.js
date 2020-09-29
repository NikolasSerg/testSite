const { Router } = require('express');
const router = Router();
const Product = require('../models/product');

router.get('/', (req, res) => {
    res.status(200);
    res.render('add', {
        title: "Add product"
    });
});

router.post('/', (req, res) => {
    console.log(req.body);
    // res.end('posts did his job')
    const product = new Product(req.body.title, req.body.prices, req.body.img);
    product.save();

    res.redirect('/posts');
});

module.exports = router;