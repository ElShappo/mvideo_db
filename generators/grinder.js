const {faker} = require('@faker-js/faker');

function createRandomItem() {
    return {
      max_wheel_diameter: faker.datatype.number({min: 10, max: 200}),
      landing_hole_diameter: faker.datatype.number({min: 10, max: 200}),
      max_rotation_speed: faker.datatype.number({min: 20, max: 400}),
      power_consumption: faker.datatype.number({min: 100, max: 500}),
      guarantee_period: faker.datatype.number({min: 1, max: 3}),
      wheels_number: faker.datatype.number({min: 2, max: 5})
    };
}

module.exports.createRandomGrinderService = function(n) {
    let arr = [];
    Array.from({ length: n }).forEach(() => {
        arr.push(createRandomItem());
    });
    return arr;
}