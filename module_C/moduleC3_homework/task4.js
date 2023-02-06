function ElectricDevice (name, power) {
    this.name = name;
    this.power = power;
    this.plugIn = false;
}

// включение прибора
ElectricDevice.prototype.on = function() {
    console.log(this.name + " включен!");
    this.plugIn = true;
};

// выключение прибора
ElectricDevice.prototype.off = function() {
    console.log(this.name + " выключен!");
    this.plugIn = false;
};

// Чайник
function Kettle(name, brand, power, material) {
    this.name = name;
    this.brand = brand;
    this.power = power;
    this.material = material;
    this.plugIn = false;
}

// создаем связь между прототипом и чайником
Kettle.prototype = new ElectricDevice();

// Микроволновка
function Microwave(name, brand, power, instalation) {
    this.name = name;
    this.brand = brand;
    this.power = power;
    this.instalation = instalation;
    this.plugIn = true;
}

// создаем связь между прототипом и микроволновкой
Microwave.prototype = new ElectricDevice();

// экземпляр чайника
const kitchenKettle = new Kettle("Kitchen Kettle", "Bosch", 1500, "metal");

// экземпляр микроволновки
const kitchenMicrowave = new Microwave("Kitchen Microwave", "LG", 1000, "inner");

// включить чайник
kitchenKettle.on();

// отключить микроволновку
kitchenMicrowave.off();

console.log(kitchenKettle)
console.log(kitchenMicrowave)
console.log(`Общая потребляемая мощность всех приборов: ${kitchenKettle["power"] + kitchenMicrowave["power"]} Вт`)

//результаты вывода в консоль

// Kitchen Kettle включен!
// Kitchen Microwave выключен!
// ElectricDevice {
//   name: 'Kitchen Kettle',
//   brand: 'Bosch',
//   power: 1500,
//   material: 'metal',
//   plugIn: true
// }
// ElectricDevice {
//   name: 'Kitchen Microwave',
//   brand: 'LG',
//   power: 1000,
//   instalation: 'inner',
//   plugIn: false
// }
// Общая потребляемая мощность всех приборов: 2500 Вт
