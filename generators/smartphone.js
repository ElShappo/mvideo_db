const {faker} = require('@faker-js/faker');

function createRandomItem() {
    return {
      display: faker.datatype.float({min: 4, max: 20, precision: 0.01}),
      cpu_type: faker.helpers.arrayElement(['mediatek helio', 'qualcomm snapdragon', 'a13 bionic']),
      rom: faker.datatype.number({min: 1, max: 20}),
      camera_quality: faker.helpers.arrayElements([5, 6, 7, 8, 9, 10], 2)
    };
}

module.exports.createRandomSmartphoneService = function(n) {
    let arr = [];
    Array.from({ length: n }).forEach(() => {
        arr.push(createRandomItem());
    });
    return arr;
}