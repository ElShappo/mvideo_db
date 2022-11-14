const {faker} = require('@faker-js/faker');

function createRandomItem() {
    return {
      display_size: faker.datatype.float({min: 4, max: 20, precision: 0.01}),
      rom_size: faker.datatype.number({min: 1, max: 30}),
      ram_size: faker.datatype.number({min: 1, max: 20}),
      cores_number: faker.datatype.number({min: 1, max: 5}), 
      cpu_frequency: faker.datatype.float({min: 1, max: 5, precision: 0.1}), 
      bluetooth_module: faker.datatype.float({min: 1, float:5, precision: 0.1}),
      internet_standard: faker.helpers.arrayElement(['3G', '4G', 'LTE', 'WiFi'])
    };
}

module.exports.createRandomTabletService = function(n) {
    let arr = [];
    Array.from({ length: n }).forEach(() => {
        arr.push(createRandomItem());
    });
    return arr;
}