const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const routersHome = require('./routes/home');
const routersAbout = require('./routes/about');
const routersContact = require('./routes/contact');
const routersGallery = require('./routes/gallery');
const routersPrices = require('./routes/prices');
const routersAdd = require('./routes/add');

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(routersHome);
app.use(routersAbout);
app.use(routersContact);
app.use(routersGallery);
app.use(routersPrices);
app.use(routersAdd);

app.listen(3000, () => console.log(`server working at the port ${PORT}`));