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
    const product = new Product(
        {
            title: req.body.title, 
            price: req.body.price, 
            img: req.body.img
        });

    try {
        await product.save();
        res.redirect('/posts');    
    } catch (error) {
        console.log(error);
    }
    
});

module.exports = router;