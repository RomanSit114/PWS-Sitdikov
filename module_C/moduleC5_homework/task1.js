/* Этап 1. Подготовка данных */
const parser = new DOMParser();

const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

/* Этап 2. Получение данных */
// Парсинг XML
const xmlDOM = parser.parseFromString(xmlString, "text/xml");
const students = xmlDOM.querySelectorAll("student");

const list = [];
students.forEach((item) => {
    const name = item.querySelector('name');
    const firstNode = name.querySelector("first");
    const secondNode = name.querySelector("second");
    const ageNode = item.querySelector("age");
    const profNode = item.querySelector("prof");
  
    // Получение данных из атрибутов
    const nameAttr = name.getAttribute('lang');
  
    /* Этап 3. Запись данных в массив */
    list.push({
      name: `${firstNode.textContent} ${secondNode.textContent}`,
      age: Number(ageNode.textContent),
      prof: profNode.textContent,
      lang: nameAttr
    });
});

console.log({list});
