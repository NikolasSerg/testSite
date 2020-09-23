const { Router } = require('express');

const router = Router();

router.get('/about', (req, res) => {
    res.status(200);
    res.render('about', {
        title: "about",
        isAbout: true
    });
})


module.exports = router;