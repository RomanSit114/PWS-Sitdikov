function havePropInObject (str, object) {
    return (str in object);
}

let person = {
    city:"Moscow",
    name:"Alex"
}

console.log(havePropInObject("name",person))
//true
console.log(havePropInObject("weight",person))
//false, т.к. данное свойство в объекте person отсутствует
