const { Router } = require('express');

const router = Router();

router.get('/add', (req, res) => {
    res.status(200);
    res.render('add', {
        title: "Add product"
    });
})


module.exports = router;