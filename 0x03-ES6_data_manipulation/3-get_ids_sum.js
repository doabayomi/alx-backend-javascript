export default function getStudentIdsSum(students) {
  const initialValue = 0;

  const idsSum = students.reduce(
    (total, student) => total + Number(student.id), initialValue,
  );

  return idsSum;
}
