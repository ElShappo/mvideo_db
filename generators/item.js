const {faker} = require('@faker-js/faker');

function createRandomItem() {
    return {
      price: faker.commerce.price(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
    //   available_amount: faker.datatype.number({min: 0}),
      category_id: faker.datatype.number({min: 0}),
      // manufacturer_id: faker.datatype.number({min: 0})
    };
}

module.exports.createRandomItemService = function(n) {
    let arr = [];
    Array.from({ length: n }).forEach(() => {
        arr.push(createRandomItem());
    });
    return arr;
}