const { Router } = require('express');

const router = Router();
router.get('/prices', (req, res) => {
    res.status(200);
    res.render('prices', {
        title: "prices",
        isPrices: true
    });
});


module.exports = router;