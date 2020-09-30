// const uuid = require('uuid/dist/v4');
const path = require('path');
const fs = require('fs');
const { resolve } = require('path');

class Product {
    constructor(title, price, img) {
        this.title = title,
            this.price = price,
            this.img = img
            // this.uuid = uuid()
    }
    dataToJson() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            // id: this.id
        }
    }
    async save() {
        let data = await Product.getAll();

        console.log(data, ' - data');
        console.log(typeof data, ' - type of data');
        console.log(this.dataToJson(), ' - this.dataToJson() in save');
        data.push(this.dataToJson());
        console.log(data, ' - data');
        console.log(typeof data, ' - type of data');
        // return new Promise((resolve, reject) => {
        fs.writeFile(
                path.join(__dirname, '..', 'data', 'data.json'),
                JSON.stringify(data),
                (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(JSON.stringify(data));
                        console.log('write file success');
                    }
                }
            )
            // })
    }
    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'data.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log(JSON.parse(content), ' - JSON.parse(content) getAll');
                        resolve(JSON.parse(content))
                    }
                }
            )
        })
    }
}

module.exports = Product;