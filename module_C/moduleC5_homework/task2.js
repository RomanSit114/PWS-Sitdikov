/* Этап 1. Подготовка данных */

// JSON, который мы будем парсить
const jsonString = `
{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}
`;

/* Этап 2. Получение данных */
const data = JSON.parse(jsonString);
const list = data.list;

/* Этап 3. Запись данных в результирующий объект */
let mass = [];

list.forEach(function(item, i, list) {  
    result = {
      name: item.name,
      age: Number(item.age),
      prof: item.prof
    };
    mass.push(result);
});

console.log({mass});
