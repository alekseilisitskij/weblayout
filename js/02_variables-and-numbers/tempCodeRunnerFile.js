function reverseString(str) {
  let reverse = [];
  for (const i = str.length - 1; i >= 0; i) {
      reverse += str[i];
  }
  return reverse;
}

console.log(reverseString('code')); 