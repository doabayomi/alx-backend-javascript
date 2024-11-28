const fs = require('node:fs');
const readline = require('node:readline');

function readDatabase(pathToDatabase) {
  return new Promise((resolve, reject) => {
    const studentNamesByField = {};

    const readableStream = fs.createReadStream(pathToDatabase, 'utf8');
    readableStream.on('error', () => {
      reject(new Error('Cannot load the database'));
    });
    const rl = readline.createInterface({
      input: readableStream,
    });

    rl.on('line', (line) => {
      const fields = line.split(',');
      if (fields[0] !== 'firstname' && fields.length === 4) {
        const studentField = fields[3].trim();
        // Adding the first name of the student in field list
        const studentFirstName = fields[0].trim();
        if (studentField in studentNamesByField) {
          studentNamesByField[studentField].push(studentFirstName);
        } else {
          studentNamesByField[studentField] = [];
          studentNamesByField[studentField].push(studentFirstName);
        }
      }
    });

    rl.on('close', () => {
      resolve(studentNamesByField);
    });

    rl.on('error', () => {
      reject(new Error('Cannot load the database'));
    });
  });
}

module.exports = readDatabase;
