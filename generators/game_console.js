const {faker} = require('@faker-js/faker');

function createRandomItem() {
    return {
      ssd_size: faker.datatype.number({min: 30, max: 200}),
      is_hdr: faker.datatype.boolean(),
      wifi: faker.helpers.arrayElement(['802.11a', '802.11n', '802.11g']),
      guarantee_period: faker.datatype.number({min: 1, max: 3}),
      is_wireless_gamepad: faker.datatype.boolean()
    };
}

module.exports.createRandomGameConsoleService = function(n) {
    let arr = [];
    Array.from({ length: n }).forEach(() => {
        arr.push(createRandomItem());
    });
    return arr;
}