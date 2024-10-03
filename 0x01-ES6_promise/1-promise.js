export default function getFullResponseFromAPI(success) {
  return new Promise(((resolve, reject) => {
    if (success) {
      const msg = {
        status: 200,
        body: 'Success',
      };
      resolve(msg);
    } else {
      reject(new Error('The fake API is not working currently'));
    }
  }));
}
