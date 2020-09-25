const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.status(200);
    res.render('add', {
        title: "Add product"
    });
});

router.post('/', (req, res) => {
    console.log(req.body);
    // res.end('posts did his job')
    res.redirect('/posts');
});

module.exports = router;