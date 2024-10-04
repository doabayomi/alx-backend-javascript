export default function createReportObject(employeesList) {
  const o = {
    allEmployees: {
      ...employeesList,
    },
    getNumberOfDepartments() {
      return Object.keys(this.allEmployees).length;
    },
  };

  return o;
}
