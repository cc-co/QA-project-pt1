const express = require('express');
const Datastore = require('nedb');
const db = new Datastore();

const app = express();


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

productAdd = (productName, productDes, productPrice) => {
    
    let product = {
        name: productName,
        description: productDes,
        price: productPrice
    };
    
    return product;

};

// GET - RESTful read all

app.get('/products', (req, res) => {

    console.log(`Reading all products: \n`);

    db.find({}, (err, products) => {

        if (err) res.send(err);

        res.status(200).send(products);

        console.log(products);
    });

});

// GET by id - RESTful read one

app.get('/product/:id', (req, res) => {

    console.log(`Read product by id: \n`);

    let prodId = req.params.id;

    db.find({_id: prodId}, (err, product) => {

        if (err) res.send(err);

        res.status(200).send(product);

        console.log(product);
    });

});

// POST - RESTful create

app.post('/product/create', (req, res) => {

    console.log(`Creating product: \n`);

    let product = productAdd(req.body.name, req.body.description, req.body.price);

    db.insert(product, (err, product) => {

        if (err) res.send(err);

       res.status(200).send(product);

        console.log(product);
    });

});

// PUT - RESTful update

app.put('/product/update/:id', (req, res) => {

    console.log(`Updated product by id: \n`);

    let prodId = req.params.id;
    
    let updatedProduct ={
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        _id: prodId
    }
    

    db.update({_id: prodId}, updatedProduct, (err, product) => {

        if (err) res.send(err);

       res.status(202).send(updatedProduct);

        console.log(updatedProduct);
    });

});

// DELETE by id - RESTful delete 

app.delete('/product/delete/:id', (req, res) => {

    console.log(`Delete product by id: \n`);

    let prodId = req.params.id;

    db.remove({_id: prodId}, (err, product) => {

        if (err) res.send(err);

        res.status(202).send(`Deleted item id is ${prodId}`);

        console.log(`Deleted item id is ${prodId}`);
    });

});


module.exports = {app, productAdd};


