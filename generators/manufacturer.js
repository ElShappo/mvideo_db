const {faker} = require('@faker-js/faker');

function createRandomManufacturer() {
    return {
      name: faker.company.name(),
    };
}

module.exports.createRandomManufacturerService = function(n) {
    let arr = [];
    Array.from({ length: n }).forEach(() => {
        arr.push(createRandomManufacturer());
    });
    return arr;
}