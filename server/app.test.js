/**
 * @jest-environment node
 */
process.env.TEST_JSON = './data_test.json';
const request = require('supertest');
const full4s = require('@suvelocity/tester');
const fs = require('fs').promises;
const app = require('./app');
const data = require('./data_test.json');

const newTicket = {
  id: 'ddsd145f-6312-5fdd-8611-2fd4dbfasdd7',
  title: 'Title test',
  content: 'Content test',
  userEmail: 'test@test.com',
  creationTime: 1514809791415,
  labels: ['Corvid', 'Api'],
};

const projectName = '1.Tickets manager backend';
describe(`${projectName} - second test suite`, () => {
  beforeAll(async () => {
    await full4s.beforeAll();
  });
  afterEach(async () => {
    await full4s.afterEach();
  });
  afterAll(async () => {
    await full4s.afterAll(projectName);
  });

  test('Can add ticket', async () => {
    const content = await fs.readFile('./data_test.json');
    const { body } = await request(app)
      .post('/api/tickets/').send(newTicket)
      .expect(200);

    expect(body.length).toBe(data.length + 1);
    expect(body[0].title).toBe(newTicket.title);
    await fs.writeFile('./data_test.json', content);
  });
});
