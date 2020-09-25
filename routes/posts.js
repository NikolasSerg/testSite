const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.status(200);
    res.render('posts', {
        title: "posts",
        isPosts: true
    });
})


module.exports = router;