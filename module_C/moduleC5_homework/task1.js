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

const xmlDOM = parser.parseFromString(xmlString, "text/xml");
const students = xmlDOM.querySelectorAll("student");

const list = [];
students.forEach((item) => {
    const name = item.querySelector('name');
    const firstNode = name.querySelector("first");
    const secondNode = name.querySelector("second");
    const ageNode = item.querySelector("age");
    const profNode = item.querySelector("prof");
    const nameAttr = name.getAttribute('lang');
  
    list.push({
      name: `${firstNode.textContent} ${secondNode.textContent}`,
      age: Number(ageNode.textContent),
      prof: profNode.textContent,
      lang: nameAttr
    });
});

console.log({list});
