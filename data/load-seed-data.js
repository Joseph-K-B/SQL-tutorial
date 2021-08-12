const client = require('../lib/client');
// import our seed data:
const chords = require('./chords.js');

run();

async function run() {

  try {
    
    // const  chord = chords[0].rows[0];

    await Promise.all(
      chords.map(chord => {
        return client.query(`
                    INSERT INTO chords (chord, key, class, major, id)
                    VALUES ($1, $2, $3, $4, $5);
                `,
        [chord.key, chord.chord, chord.id, chord.major, chord.class]);
      })
    );
    
  }
  catch(err) {
    // 
  }
  finally {
    client.end();
  }
    
}
