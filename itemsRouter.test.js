const request = require('supertest');
const express = require('express');
const itemsRouter = require('./itemsRouter');

const app = express();
app.use(express.json());
app.use('/items', itemsRouter);

describe('items API', () => {
    beforeEach(async () => {
        const newItem1 = { name: 'test1', price: 19.99};
        const newItem2 = { name: 'test2', price: 29.99};
        await request(app).post('/items').send(newItem1);
        await request(app).post('/items').send(newItem2);
    });

    it('should list all items on GET /items', async () => {
        const response = await request(app).get('/items');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([{ name: 'test1', price: 19.99}, { name: 'test2', price: 29.99}]);
    });

    it('should add an item on POST /items', async () => {
        const newItem = { name: 'test3', price: 39.99};
        const response = await request(app).post('/items').send(newItem);
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({ added: newItem });
    });

    it('should get an item on GET /items/:name', async () => {
        const response = await request(app).get('/items/test1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ name: 'test1', price: 19.99});
    });

    it('should update an item on PATCH /items/:name', async () => {
        const updatedItem = { name: 'test1', price: 99.99};
        const response = await request(app).patch('/items/test1').send(updatedItem);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ updated: updatedItem });
    });

    it('should delete an item on DELETE /items/:name', async () => {
        const response = await request(app).delete('/items/test1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: 'Deleted' });
    });
});