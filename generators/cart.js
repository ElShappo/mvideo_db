const {faker} = require('@faker-js/faker');

function createRandomCart() {
    return {
      item_quantity: faker.datatype.number(),
    };
}

module.exports.createRandomCartService = function(n) {
    let arr = [];
    Array.from({ length: n }).forEach(() => {
        arr.push(createRandomCart());
    });
    return arr;
}