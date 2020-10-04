const { Router } = require('express');
const Product = require('../models/product');

const router = Router();

router.get('/', async (req, res) => {
    let product = await Product.getAll();
    res.status(200);
    res.render('posts', {
        title: 'posts',
        isPosts: true,
        product
    });
    console.log('posts is it');
})


module.exports = router;