const uuid4 = require('uuid4');
const path = require('path');
const fs = require('fs');

class Product {
    constructor(title, price, img) {
        this.title = title,
            this.price = price,
            this.img = img
            this.id = uuid4()
    }
    dataToJson() {
        console.log({
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }, "obj in dataToJSON");
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }
    async save() {
        let data = await Product.getAll();
        data.push(this.dataToJson());
        // return new Promise((resolve, reject) => {
            fs.writeFile(
                    path.join(__dirname, '..', 'data', 'data.json'),
                    JSON.stringify(data),
                    (err) => {
                        if (err) {
                            console.log(err);
                            // reject(err);
                        } else {
                            console.log('write file success');
                            // resolve(data);
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
                        console.log('getAll done');
                        resolve(JSON.parse(content))
                    }
                }
            )
        })
    }
}

module.exports = Product;