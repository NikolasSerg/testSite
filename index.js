const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const session = require('express-session');

const routersHome = require('./routes/home');
const routersAbout = require('./routes/about');
const routersContact = require('./routes/contact');
const routersGallery = require('./routes/gallery');
const routersPrices = require('./routes/prices');
const routersAdd = require('./routes/add');
const routersPosts = require('./routes/posts');
const routersBacket = require('./routes/backet');
const routersAuth = require('./routes/auth');

const bodyParser = require("body-parser");

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
})


app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:false}))

// app.use(bodyParser.json());

app.use('/', routersHome);
app.use('/about', routersAbout);
app.use('/contact', routersContact);
app.use('/gallery', routersGallery);
app.use('/prices', routersPrices);
app.use('/add', routersAdd);
app.use('/posts', routersPosts);
app.use('/backet', routersBacket);
app.use('/auth', routersAuth);

const PORT = process.env.PORT || 3000;

async function start() {
    
    // mongodb+srv://mongoSergiu:<password>@cluster0.buhaq.azure.mongodb.net/<dbname>?retryWrites=true&w=majority
    try {
        const url = 'mongodb+srv://mongoSergiu:mongoSergiu@cluster0.buhaq.azure.mongodb.net/test';
        await mongoose.connect(url, {
            useNewUrlParser: true
            ,useUnifiedTopology: true
        })    
        app.listen(PORT, () => console.log(`server working at the port ${PORT}`));
    } catch (error) {
        console.log(' ----------------- error conection start');
        console.log(error);
        console.log(' ----------------- error conection end');
    }
}
start();





