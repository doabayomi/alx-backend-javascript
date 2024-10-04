export default function returnHowManyArguments(...args) {
  let arg_count = 0;
  for (const arg of args) {
    arg_count += 1;
  }
  return arg_count;
}
