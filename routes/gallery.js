const { Router } = require('express');

const router = Router();
router.get('/gallery', (req, res) => {
    res.status(200);
    res.render('gallery', {
        title: "gallery",
        isGallery: true
    });
});

module.exports = router;