require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');
const chordData = require('../data/chords.js');

describe('app routes', () => {
  describe('routes', () => {
    // let token;
  
    beforeAll(async () => {
      execSync('npm run setup-db');
  
      await client.connect();
      //   const signInData = await fakeRequest(app)
      //     .post('/auth/signup')
      //     .send({
      //       email: 'jon@user.com',
      //       password: '1234'
      //     });
      
    //   token = signInData.body.token; // eslint-disable-line
    }, 1000000);
  
    afterAll(done => {
      return client.end(done);
    });

    test('returns chords', async() => {

      const expectation = chordData.map(chords => chords.chord);

      const data = await fakeRequest(app)
        .get('/chords')
        .expect('Content-Type', /json/)
        .expect(200);
      
      const chordList = data.body.map(chords => chords.chord);
      expect(chordList.body).toEqual(expectation);
      expect(chordList.length).toBe(chordData.length);
      
    }, 1000000);
    test('GET /chords/:id returns chord', async ()=>{
      const expectation = chordData[0];
      expectation.id = 1;
      const data = await fakeRequest(app)
        .get('/chords/1')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(data.body).toEqual(expectation);
    });
  });
});
