const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const routersHome = require('./routes/home');
const routersAbout = require('./routes/about');
const routersContact = require('./routes/contact');
const routersGallery = require('./routes/gallery');
const routersPrices = require('./routes/prices');
const routersAdd = require('./routes/add');
const routersPosts = require('./routes/posts');
const routersBacket = require('./routes/backet');

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})


app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))

app.use('/', routersHome);
app.use('/about', routersAbout);
app.use('/contact', routersContact);
app.use('/gallery', routersGallery);
app.use('/prices', routersPrices);
app.use('/add', routersAdd);
app.use('/posts', routersPosts);
app.use('/backet', routersBacket);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server working at the port ${PORT}`));