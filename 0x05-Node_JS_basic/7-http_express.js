const express = require('express');
const fs = require('fs');
const readline = require('readline');

function countStudents(pathToDatabase) {
  return new Promise((resolve, reject) => {
    let noOfStudents = 0;
    const stats = {};
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
        // Increment the no of students
        noOfStudents += 1;
        // Add the number based on field
        const studentField = fields[3].trim();
        if (studentField in stats) {
          stats[studentField] += 1;
        } else {
          stats[studentField] = 1;
        }
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
      let summary = `Number of students: ${noOfStudents}\n`;
      for (const field in stats) {
        if (Object.prototype.hasOwnProperty.call(stats, field)) {
          const studentCount = stats[field];
          summary = `${summary}No of students in ${field}: ${studentCount}. `
            + `List: ${studentNamesByField[field].join(', ')}\n`;
        }
      }
      resolve(summary.trim());
    });

    rl.on('error', () => {
      reject(new Error('Cannot load the database'));
    });
  });
}

const app = express();
const port = 1245;
const database = process.argv[2];

app.get('/', (req, res) => {
  res.send('Helo Holberton School!');
});

app.get('/students', (req, res) => {
  countStudents(database)
    .then((studentSummary) => {
      res.send(`This is the list of our students\n${studentSummary}`);
    })
    .catch((error) => {
      res.send(`This is the list of our students\n${error.message}`);
    });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;
