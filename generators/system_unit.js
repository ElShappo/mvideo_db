const {faker} = require('@faker-js/faker');

function createRandomItem() {
    return {
      cpu_type: faker.helpers.arrayElement(['intel core i5', 'intel core i7', 'intel core i9', 'amd ryzen 5']),
      ram_size: faker.datatype.number({min: 10, max: 200}),
      video_card: faker.helpers.arrayElement(['geforce mx', 'radeon graphics']),  
      ssd_size: faker.datatype.number({min: 10, max: 200}),
      vram_size: faker.datatype.number({min: 10, max: 200}),
      os: faker.helpers.arrayElement(['windows 10', 'windows 11', 'not installed']), 
      guarantee_period: faker.datatype.number({min: 1, max: 3})
    };
}

module.exports.createRandomSystemUnitService = function(n) {
    let arr = [];
    Array.from({ length: n }).forEach(() => {
        arr.push(createRandomItem());
    });
    return arr;
}