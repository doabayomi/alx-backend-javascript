const { createServer } = require('http');
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

const hostname = '127.0.0.1';
const port = 1245;
const database = process.argv[2];

const app = createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  switch (req.url) {
    case '/':
      res.writeHead(200);
      res.end('Hello Holberton School!');
      break;

    case '/students':
      countStudents(database)
        .then((studentOutline) => {
          const message = `This is the list of our students\n${studentOutline}`;
          res.setHeader('Content-Length', message.length);
          res.writeHead(200);
          res.write(message);
        })
        .catch((error) => {
          const message = `This is the list of our students\n${error.message}`;
          res.setHeader('Content-Length', message.length);
          res.writeHead(200);
          res.write(message);
        });
      break;

    default:
      res.writeHead(404);
      res.end('Not found');
      break;
  }
});

app.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
});

module.exports = app;
