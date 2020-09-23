const { Router } = require('express');

const router = Router();
router.get('/contact', (req, res) => {
    res.status(200);
    res.render('contact', {
        title: "contact",
        isContact: true
    });
});


module.exports = router;