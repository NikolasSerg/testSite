// const uuid = require('uuid/dist/v4');
const path = require('path');
const fs = require('fs');

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
        data.push(this.dataToJson())
        console.log(data);
    }
    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'data.js'), 
                'utf-8',
                (err, content) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(content))
                    }
                }
            )
        })
    }
}

module.exports = Product;