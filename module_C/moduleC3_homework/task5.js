class ElectricDevice {
    constructor(name, power){
        this.name = name;
        this.power = power;
        this.plugIn = false;
    }
    // включение прибора
    on() {
        console.log(this.name + " включен!");
        this.plugIn = true;
    }

    // выключение прибора
    off() {
        console.log(this.name + " выключен!");
        this.plugIn = false;
    }
}

// Чайник
class Kettle extends ElectricDevice {
    constructor (name, brand, power, material) {
        super(name, power);
        this.brand = brand;
        this.material = material;
        this.plugIn = false;
    }
}

// Микроволновка
class Microwave extends ElectricDevice {
    constructor(name, brand, power, instalation) {
        super(name, power);
        this.brand = brand;
        this.instalation = instalation;
        this.plugIn = true;
    }
}

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
// Kettle {
//   name: 'Kitchen Kettle',
//   power: 1500,
//   plugIn: true,
//   brand: 'Bosch',
//   material: 'metal'
// }
// Microwave {
//   name: 'Kitchen Microwave',
//   power: 1000,
//   plugIn: false,
//   brand: 'LG',
//   instalation: 'inner'
// }
// Общая потребляемая мощность всех приборов: 2500 Вт
