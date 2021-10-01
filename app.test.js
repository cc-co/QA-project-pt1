const request = require('supertest');
const app = require('./app').app;
const add = require('./app').productAdd;

// TEST THE REST API ENDPOINT FOR GET
describe('GET requests', () => {

    test('GET product/read endpoint, expect 200', async () => {
        const res = await request(app).get('/products')
        expect(res.statusCode).toBe(200);
    });

    test('GET bad endpoint, expect 404', async () => {
      const res = await request(app).get('/badEndPoint')
      expect(res.statusCode).toBe(404);
    });

});

// TEST THE REST API ENDPOINT FOR POST
describe('CREATE request', () => {

    test('CREATE product test', async () => {
	// TEST IN HERE
        const res = await request(app).post('/product/create').send({"name": "test product", "description": "test description","price":10})
        expect(res.statusCode).toBe(200);
    });

    test('CREATE product test for missing fields', async () => { 
        const res = await request(app).post('/product/create').send({})
        expect(res.statusCode).toBe(500);
    
    })
});

// UNIT TEST THE PRODUCT BUILDER
describe('Unit Tests', () => {
    const product = {
        name: "test product name",
        description: "test product description",
        price: 10
    }
    test('product object add with all fields, success case', () => {
        expect(add("test product name", "test product description", 10)).toStrictEqual(product);
    });

    const product_m = {
        name: undefined,
        description: "test product description",
        price: 10
    }
    test('product object add with missing fields, failed case', () => {
        expect(add(product_m)).toStrictEqual(undefined);
    });

});