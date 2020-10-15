const { Router } = require('express');
const router = Router();
const Product = require('../models/goods');

router.get('/', (req, res) => {
    res.status(200);
    res.render('addPosts', {
        title: "Add post"
    });
});

router.post('/', (req, res) => {
    console.log(req.body[0], ' - req.body[0]');
    console.log(req.body[1], ' -req.body[1]');
    console.log(req.body, ' -req.body');

    for (const key in req.body) {
        // if (req.body.hasOwnProperty(key)) {
        //     const element = req.body[key];
            
        // }
        console.log(key, ' - key');
        console.log(key.value, ' - key');
        console.log(req.body[key], ' - key[]');
    } 
    // const product = new Product(req.body.title, req.body.price, req.body.img);
    // await product.save();
    res.redirect('/posts');
});

module.exports = router;

