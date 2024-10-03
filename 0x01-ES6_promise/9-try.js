export default function guardrail(mathFunction) {
  const queue = [];
  let response;

  try {
    response = mathFunction();
  } catch (e) {
    response = `${e.name}: ${e.message}`;
  }
  queue.push(response);
  queue.push('Guardrail was processed');

  return queue;
}
