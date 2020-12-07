const { Router } = require('express');
const Product = require('../models/product');
const user = require('../models/user');
const User = require('../models/user');

const router = Router();

router.get('/', async(req, res) => {
    let product = await Product.find();
    res.status(200);
    res.render('posts', {
        title: 'posts',
        isPosts: true,
        product
    });
    console.log('posts is it');
});

router.post('/add', (req, res) => {
    const user = req.user;
    console.log(req.body, ' - req.body in router POST')
    user.addCart(req.body);

    res.render('backet', req.body)
})

router.get('/:id', async(req, res) => {
    console.log(req.params.id, ' - req.params.id');
    let product = await Product.findById(req.params.id);
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
    let product = await Product.findById(req.params.id);
    res.render('post-edit', {product});
})

router.post('/edit', async (req, res) => {
   console.log(req.body, ' -  req.body');
    await Product.updateOne({_id: req.body.id});
    res.redirect("/posts");
})

router.post('/remove', async (req, res) => {
    try {
        await Product.deleteOne({_id: req.body.id})    
    } catch (error) {
        console.log(error);
    }
    res.redirect('/posts');
})

module.exports = router; 