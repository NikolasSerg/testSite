const { Router } = require('express');
const router = Router();
const Product = require('../models/product');

router.get('/', (req, res) => {
    res.status(200);
    res.render('add', {
        title: "Add product"
    });
});

router.post('/', async (req, res) => {
    console.log(req.body, ' -req.body');
    const product = new Product(req.body.title, req.body.price, req.body.img);
    await product.save();
    res.redirect('/posts');
});

module.exports = router;