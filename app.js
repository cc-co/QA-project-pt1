const express = require('express');
const Datastore = require('nedb');
const db = new Datastore();

const app = express();
const PORT = 8080;

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

// GET - RESTful 

app.get('/products', (req, res) => {

    console.log(`Reading all products: \n`);

    db.find({}, (err, products) => {

        if (err) res.send(err);

        res.status(200).send(products);

        console.log(products);
    });

});

// POST

app.post('/product/create', (req, res) => {

    console.log(`Creating product: \n`);

    let product = productAdd(req.body.name, req.body.description, req.body.price);

    db.insert(product, (err, product) => {

        if (err) res.send(err);

       res.status(200).send(product);

        console.log(product);
    });

});



app.listen(PORT, () => {
    console.log(`API listening on http:localhost:${PORT}`);
});



