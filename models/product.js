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

    // saveMethod() {
    //     return  new Promise((resolve, reject) => {
    //         return fs.writeFile(
    //             path.join(__dirname, '..', 'data', 'data.json'),
    //             JSON.stringify(data),
    //             (err) => {
    //                 if (err) {
    //                     console.log(err);
    //                     reject(err);
    //                 } else {
    //                     console.log('write file success');
    //                     resolve(data);
    //                 }
    //             }
    //         )
    //     })
    // }

    async save() {
        let data = await Product.getAll();
        data.push(this.dataToJson());
        // return  await Product.saveMethod();
        return new Promise((resolve, reject) => {
            return fs.writeFile(
                path.join(__dirname, '..', 'data', 'data.json'),
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
        }
        )
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
    static async getId(id) {
        // console.log(id, ' - id in PRODUCT');
        let data = await Product.getAll();
        // console.log(data, ' - data in PRODUCT ')
        // // console.log(typeof data, ' - type data in PRODUCT');
        // let idProduct = data.find(iterator => iterator.id === id);
        // console.log(idProduct, ' - idProd in PRODUCT');
        // return idProduct;
        return data.find(iterator => iterator.id === id);
    }
    static async update(arg) {
        console.log(arg, ' - arg ');
        let data = await Product.getAll();
        console.log(typeof data);
        
        console.log(data, ' - data');
        let indexData = data.findIndex(item => item.id === arg.id);
        console.log(indexData, ' - indexData');
        data[indexData] = arg;

        fs.writeFile(
            path.join(__dirname, '..', 'data', 'data.json'),
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
    }
}

module.exports = Product;