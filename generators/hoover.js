const {faker} = require('@faker-js/faker');

function createRandomItem() {
    return {
      suction_power: faker.datatype.number({min: 10, max: 200}),
      nozzles_number: faker.datatype.number({min: 1, max: 5}),
      power_cord_length: faker.datatype.number({min: 1, max: 3}), 
      power_consumption: faker.datatype.number({min: 20, max: 2000}),
      is_upright: faker.datatype.boolean(),
      weight: faker.datatype.number({min: 1, max: 2}), 
      guarantee_period: faker.datatype.number({min: 1, max: 3})
    };
}

module.exports.createRandomHooverService = function(n) {
    let arr = [];
    Array.from({ length: n }).forEach(() => {
        arr.push(createRandomItem());
    });
    return arr;
}