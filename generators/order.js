const {faker} = require('@faker-js/faker');

function createRandomOrder() {
    return {
        order_address: faker.address.streetAddress(),
        order_date: faker.date.recent(),
        delivery_method: faker.helpers.arrayElement(['pickup', 'courier']),
        order_price: faker.commerce.price(),
        payment_method: faker.helpers.arrayElement(['card', 'cash'])
    };
}

module.exports.createRandomOrderService = function(n) {
    let arr = [];
    Array.from({ length: n }).forEach(() => {
        arr.push(createRandomOrder());
    });
    return arr;
}