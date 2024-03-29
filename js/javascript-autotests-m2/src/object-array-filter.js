function filter(objects, property, value) {
  let result = [];
  for (let i = 0; i < objects.length; i++) {
    if (objects[i][property] === value) {
      result.push(objects[i]);
    }
  }
  return result;
}

let objects = [
  { name: 'Василий', surname: 'Васильев' },
  { name: 'Иван', surname: 'Иванов' },
  { name: 'Пётр', surname: 'Петров' },
];

filter(objects, 'name', 'Василий');

export default filter;
