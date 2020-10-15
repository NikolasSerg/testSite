
const uuid4 = require('uuid4');
const id = uuid4();
const path = require('path');
const fs = require('fs');

let productArr = [];
let postObj = {};

function productFactory(obj) {
    for (const key in obj) {
        console.log(key, ' - key')
        console.log(obj[key], ' - obj[key]')
        if (key == "num1" || key == "num2" || key == "num3") {
            
            productArr[key] = obj[key];
            console.log(productArr);
            console.log('catcha');
        } else {
            console.log('popa');                
        }
    }
}

class Product {
    constructor(title, price, img, id) {
        this.title = title,
        this.price = price,
        this.img = img,
        this.post = post,
        this.id = id

    }
    dataToJson() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }
    async save() {
        let data = await Product.getAll();
        // console.log(data, ' - data in save');
        data.push(this.dataToJson());
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 
                'dataGoods.json'),
                JSON.stringify(data),
                (err) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        console.log('write file success');
                        resolve(data);
                    }
                }
            )
        })
    }
    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 
                'dataGoods.json'
                ),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err)
                    } else {
                        // console.log(JSON.parse(content), ' - JSON.parse(content)')
                        // console.log('getAll dataGoods done');
                        resolve(JSON.parse(content))
                    }
                }
            )
        })
    }
    static async getId(id) {
        console.log(id, ' - id in PRODUCT');
        let data = await Product.getAll();
        console.log(data, ' - data in PRODUCT ')
        console.log(typeof data, ' - type data in PRODUCT');
        let idProduct = data.find(iterator => iterator.id === id);

        console.log(idProduct, ' - idProd in PRODUCT');
        // return idProduct;
        return data.find(iterator => iterator.id === id);
    }
}

module.exports = productFactory;