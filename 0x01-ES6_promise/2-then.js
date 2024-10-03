export default function handleResponseFromAPI(promise) {
  return promise.then(() => {
    const msg = {
      status: 200,
      body: 'success',
    };
    console.log('Got a response from the API');
    return msg;
  }).catch(() => new Error());
}
