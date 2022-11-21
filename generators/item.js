const {faker} = require('@faker-js/faker');

function createRandomItem() {
    return {
      price: faker.commerce.price(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
    //   available_amount: faker.datatype.number({min: 0}),
      category_id: faker.datatype.number({min: 0}),
    category_name: faker.helpers.arrayElement(['video_recorder', 'tv', 'tablet', 'system_unit', 'smartphone', 'laptop', 'hoover', 'headphone', 'grinder', 'game_console', 'fridge', 'camera'])
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