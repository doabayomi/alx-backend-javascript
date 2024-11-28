const readDatabase = require('../utils');

class StudentsController {
  static getAllStudents(request, response) {
    const database = process.argv.length > 2 ? process.argv[2] : '';

    readDatabase(database)
      .then((summary) => {
        let result = 'This is the list of students\n';
        for (const [field, students] of Object.entries(summary)) {
          const noOfStudentsInField = students.length;
          result += `Number of students in ${field}: ${noOfStudentsInField}`
        + ` List: ${students.join(', ')}\n`;
        }
        response.status(200).send(result);
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;
    const validMajors = ['CS', 'SWE'];
    const database = process.argv.length > 2 ? process.argv[2] : '';

    if (!validMajors.includes(major)) {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(database)
      .then((summary) => {
        response.status(200).send(`List: ${summary[major].join(', ')}`);
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }
}

module.exports = StudentsController;
