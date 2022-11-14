const {faker} = require('@faker-js/faker');

function createRandomItem() {
    return {
      connection_type: faker.helpers.arrayElement(['bluetooth', 'wired']),
      color: faker.color.rgb(),
      min_frequency: faker.datatype.number({min: 1, max: 20}), 
      max_frequency: faker.datatype.number({min: 20, max: 2000}),
      sensitivity: faker.datatype.number({min: 10, max: 200}),
      ear_pads_material: faker.helpers.arrayElement(['artificial skin', 'silicone']), 
      guarantee_period: faker.datatype.number({min: 1, max: 3}),
      is_headset: faker.datatype.boolean()
    };
}

module.exports.createRandomHeadphoneService = function(n) {
    let arr = [];
    Array.from({ length: n }).forEach(() => {
        arr.push(createRandomItem());
    });
    return arr;
}