const { Router } = require('express');
const Product = require('../models/product');

const router = Router();

router.get('/', async(req, res) => {
    let product = await Product.find({}).lean();
    res.status(200);
    res.render('posts', {
        title: 'posts',
        isPosts: true,
        product
    });
    // console.log(product, ' - product with mongo');
});

router.get('/:id', async(req, res) => {
    console.log(req.params.id, ' - ----------------req.params.id');
    let product = await Product.findById(req.params.id).exec();
    console.log(product, ' - product with findID');
    res.render('post', {
        title: product.title,
        product: product
    });
})

router.get('/:id/edit', async (req, res) => {
    if(!req.query.allow) {
        return res.redirect("/");
    }
    let product = await Product.findById(req.params.id);
    res.render('post-edit', {product});
})

router.post('/edit', async (req, res) => {
   console.log(req.body, ' -  req.body');
    await Product.update(req.body);
    res.redirect("/posts");

  
   let indexData = data.findIndex();
   console.log(indexData, ' - indexData');
   console.log(data[indexData], ' - data[indexData]');
})

module.exports = router; 