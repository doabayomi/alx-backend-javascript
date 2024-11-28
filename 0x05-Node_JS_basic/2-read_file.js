const fs = require('fs');
const readline = require('readline');

function countStudents(pathToDatabase) {
  let noOfStudents = 0;
  const stats = {};
  const studentNamesByField = {};

  const readableStream = fs.createReadStream(pathToDatabase, 'utf8');
  readableStream.on('error', () => {
    throw new Error('Cannot load the database');
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
    console.log(`Number of students: ${noOfStudents}`);
    for (const field in stats) {
      if (Object.prototype.hasOwnProperty.call(stats, field)) {
        const studentCount = stats[field];
        console.log(`No of students in ${field}: ${studentCount}. `
          + `List: ${studentNamesByField[field].join(', ')}`);
      }
    }
  });

  rl.on('error', () => {
    throw new Error('Cannot load the database');
  });
}

module.exports = countStudents;
