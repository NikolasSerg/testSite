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
    console.log(product, ' - product with mongo');
});

router.get('/:id', async(req, res) => {
    console.log(req.params.id, ' - ----------------req.params.id');
    let product = await Product.findById(req.params.id);
    console.log(product, ' - product with findID');
    console.log(typeof product, ' - typrof product with findID');
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
    console.log(product, ' - product in /id/edit ------');
    res.render('post-edit', {product});
})

router.post('/edit', async (req, res) => {
    console.log(req.body, ' -  req.body in EDIT ---------');
    let {id} = req.body;
    delete req.body.id;
    await Product.findByIdAndUpdate(id, req.body);
    res.redirect("/posts");

  
   let indexData = data.findIndex();
   console.log(indexData, ' - indexData');
   console.log(data[indexData], ' - data[indexData]');
})

router.post('/remote', async (req, res) => {

    try {
        await Product.deleteOne({_id: req.body.id})        
        res.redirect('/posts');
    } catch (error) {
        console.log(error);
    }
    // console.log(req.body, ' -  REMOTE body');
})

module.exports = router; 