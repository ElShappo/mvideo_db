const {faker} = require('@faker-js/faker');

function createRandomStore() {
    return {
      city: faker.address.city(),
      street: faker.address.street(),
    };
}

module.exports.createRandomStoreService = function(n) {
    let arr = [];
    Array.from({ length: n }).forEach(() => {
        arr.push(createRandomStore());
    });
    return arr;
}