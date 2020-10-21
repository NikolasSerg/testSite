const { Router } = require('express');
const Product = require('../models/product');

const router = Router();

router.get('/', async(req, res) => {
    let product = await Product.getAll();
    res.status(200);
    res.render('posts', {
        title: 'posts',
        isPosts: true,
        product
    });
    console.log('posts is it');
});

router.get('/:id', async(req, res) => {
    console.log(req.params.id, ' - req.params.id');
    let product = await Product.getId(req.params.id);
    console.log(product, ' - product');
    res.render('post', {
        title: product.title,
        product: product
    });
})

router.get('/:id/edit', async (req, res) => {
    if(!req.query.allow) {
        return res.redirect("/");
    }
    let product = await Product.getId(req.params.id);
    res.render('post-edit', {product});
})

module.exports = router;