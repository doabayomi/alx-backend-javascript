export default function updateStudentGradeByCity(students, city, newGrades) {
  const filteredStudents = students.filter((student) => student.location === city);
  const updatedStudents = filteredStudents.map((student) => {
    const updatedStudent = student;

    const gradeEntry = newGrades.find((grade) => grade.studentId === student.id);
    if (gradeEntry) {
      updatedStudent.grade = gradeEntry.grade;
    } else {
      updatedStudent.grade = 'N/A';
    }

    return updatedStudent;
  });
  return updatedStudents;
}
