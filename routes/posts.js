const { Router } = require('express');
const Product = require('../models/product');

const router = Router();

router.get('/', async(req, res) => {
    const product = await Product.getAll();
    console.log(product, ' - product in post.js');
    res.status(200);
    res.render('posts', {
        title: "posts",
        isPosts: true,
        product
    });
})


module.exports = router;