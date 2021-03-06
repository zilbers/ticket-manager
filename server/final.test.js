/**
 * @jest-environment node
 */
process.env.TEST_JSON = './data_test.json';
const request = require('supertest');
const full4s = require('@suvelocity/tester');
const fs = require('fs').promises;
const app = require('./app');
const data = require('./data_test.json');

const projectName = '1.Tickets manager backend';
describe(projectName, () => {
  beforeAll(async () => {
    await full4s.beforeAll();
  });
  afterEach(async () => {
    await full4s.afterEach();
  });
  afterAll(async () => {
    await full4s.afterAll(projectName);
  });
  test('Can get all tickets', async () => {
    const { body } = await request(app)
      .get('/api/tickets')
      .expect(200);

    expect(body.length).toBe(data.length);
    expect(body[0].id).toBe(data[0].id);
  });

  test('Can get relevant tickets by searchText query param', async () => {
    const { body } = await request(app)
      .get('/api/tickets').query({
        searchText: 'full',
      })
      .expect(200);

    expect(body.length).toBe(1);
    expect(body[0].id).toBe('78d09b01-6ca0-5746-82a4-9e02db81552a');
  });

  test('Can mark ticket as done and undone', async () => {
    const currentState = data[0].done || false;
    const { body } = await request(app)
      .post(`/api/tickets/${data[0].id}/${currentState ? 'undone' : 'done'}`).query({
        searchText: 'full',
      })
      .expect(200);

    expect(body.updated).toBe(true);
    const content = await fs.readFile('./data_test.json');
    const updatedData = JSON.parse(content);
    expect(updatedData[0].done).toBe(!currentState);

    const { body: undoneBody } = await request(app)
      .post(`/api/tickets/${data[0].id}/${currentState ? 'done' : 'undone'}`).query({
        searchText: 'full',
      })
      .expect(200);

    expect(undoneBody.updated).toBe(true);
    const content2 = await fs.readFile('./data_test.json');
    const updatedData2 = JSON.parse(content2);
    expect(updatedData2[0].done).toBe(currentState);
  });
});
