const client = require('../lib/client');
// import our seed data:
const chords = require('./chords.js');
const usersData = require('./users.js');
const { getEmoji } = require('../lib/emoji.js');

run();

async function run() {

  try {
    await client.connect();

    const chords = await Promise.all(
      usersData.map(user => {
        return client.query(`
                      INSERT INTO users (email, hash)
                      VALUES ($1, $2)
                      RETURNING *;
                  `,
        [user.email, user.hash]);
      })
    );
    
    const  chord= chords[0].rows[0];

    await Promise.all(
      chords.map(chord => {
        return client.query(`
                    INSERT INTO chords (name, key, class)
                    VALUES ($1, $2, $3);
                `,
        [chord.key, chord.chord, chord.id]);
      })
    );
    

    console.log('seed data load complete', getEmoji(), getEmoji(), getEmoji());
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
    
}
