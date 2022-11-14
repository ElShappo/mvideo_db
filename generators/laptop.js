const {faker} = require('@faker-js/faker');

function createRandomItem() {
    return {
      display_resolution: faker.datatype.float({min: 4, max: 20, precision: 0.1}),
      cpu_type: faker.helpers.arrayElement(['intel core i5', 'intel core i7', 'intel core i9', 'amd ryzen 5']),
      ssd_size: faker.datatype.number({min: 10, max: 200}),
      os: faker.helpers.arrayElement(['windows 10', 'windows 11', 'not installed']), 
      video_card: faker.helpers.arrayElement(['geforce mx', 'radeon graphics']), 
      ram_size: faker.datatype.number({min: 10, max: 200}),
      weight: faker.datatype.number({min: 1, max: 3})
    };
}

module.exports.createRandomLaptopService = function(n) {
    let arr = [];
    Array.from({ length: n }).forEach(() => {
        arr.push(createRandomItem());
    });
    return arr;
}