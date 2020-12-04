const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const routersHome = require('./routes/home');
const routersAbout = require('./routes/about');
const routersContact = require('./routes/contact');
const routersGallery = require('./routes/gallery');
const routersPrices = require('./routes/prices');
const routersAdd = require('./routes/add');
const routersPosts = require('./routes/posts');
const routersBacket = require('./routes/backet');

const bodyParser = require("body-parser");

const product = require('./models/product');
const User = require('./models/user');

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

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))

app.use(bodyParser.json());


app.use(async (req, res, next) => {
    try {
        const user = await User.findById('5fc9f3f32f1c96acd1f0ba87');
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
    }
})

app.use('/', routersHome);
app.use('/about', routersAbout);
app.use('/contact', routersContact);
app.use('/gallery', routersGallery);
app.use('/prices', routersPrices);
app.use('/add', routersAdd);
app.use('/posts', routersPosts);
app.use('/backet', routersBacket);



const PORT = process.env.PORT || 3000;


async function start() {
    const dbname = "product";
    const url = `mongodb+srv://mongoSergiu:mongoSergiu@cluster0.buhaq.azure.mongodb.net/${dbname}`;

    try {   
        await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
        app.listen(PORT, () => console.log(`server working at the port ${PORT}`));

        const users = await User.findOne();
        if(!users) {
            const user = new User({
                name: "Serg",
                email: "nikolasalon@gmail.com",
                cart: [{}]
            })
            await user.save(); 
        }
        

    } catch (error) {
        console.log(error);        
    }
}

start()

