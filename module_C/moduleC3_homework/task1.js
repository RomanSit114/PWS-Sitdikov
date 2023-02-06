function getKeysAndValues (object) {
    for (let prop in object) {
        if (object.hasOwnProperty(prop)) {
            console.log(`${prop}: ${object[prop]}`);
        }
    }
}

let person = {
    city:"Moscow"
}

let student = Object.create(person);
student.ownCity = "Peterburg";

getKeysAndValues(student)
//свойство city объекта person не выведется, т.к. использован метод hasOwnProperty, который выводит
//только те свойства, которые непосредственно принадлежат объекту (собственные)
