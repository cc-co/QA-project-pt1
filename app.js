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

app.get('/products', (req, res) => {

    console.log(`Reading all products: \n`);

    db.find({}, (err, products) => {

        if (err) res.send(err);

        res.status(200).send(products);

        console.log(products);
    });

});

app.listen(PORT, () => {
    console.log(`API listening on http:localhost:${PORT}`);
});