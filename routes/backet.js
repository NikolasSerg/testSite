const {Router} = require('express');
const router = Router();
const backet = require('../models/backet');
const colors = require('colors');

colors.setTheme({
  info: 'bgGreen',
  help: 'cyan',
  warn: 'yellow',
  success: 'bgBlue',
  error: 'red'
});

router.post('/', async (req, res) => {
    console.log(req.body, ' - req.body in backet');
   
    let backetId = await backet.getId(req.body.id);
    console.log(backetId, ' - backetId'.bgGreen.error);
    console.log(backetId.length, '- backetId.length');

    if(backetId.length == 0) {
        console.log(backetId.length, ' - backetId.length');
        let newSave = req.body;
        console.log(newSave,  ' - newSave');
        newSave.count = 1;
        let url = newSave.img;
        console.log(url, ' - url');
        console.log(typeof url, ' - typeof url');

        let urlSlice = url.slice(5);
        let urlNew = "/img/"+"backet/"+urlSlice;
        newSave.img = urlNew;
        await backet.save(newSave);
    } else {
        backetId[0].count += 1;
        backet.save(backetId[0], ' - backetId');
    }

    res.redirect('/posts');
});

router.get('/', async (req, res) => {
    let data = await backet.getAll();
    // console.log(typeof data, ' - typeof data');
    // console.log(data.length, ' - data.length');
    // console.log(data, ' - backet');
    res.render('backet', {
        data
    });

})


module.exports = router;