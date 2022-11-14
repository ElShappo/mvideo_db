const {faker} = require('@faker-js/faker');

function createRandomTv() {
    return {
      is_hdr: faker.datatype.boolean(),
      // hdr_type: faker.helpers.arrayElement(['HDR10+', '']),
      is_smarttv: faker.datatype.boolean(),
      is_bluetooth_module: faker.datatype.boolean(),
      os: faker.helpers.arrayElement(['vidaa 4.2', 'WebOS', 'android 10.0']), 
      is_wifi: faker.datatype.boolean()
    };
}

module.exports.createRandomTvService = function(n) {
    let arr = [];
    Array.from({ length: n }).forEach(() => {
        arr.push(createRandomTv());
    });
    return arr;
}