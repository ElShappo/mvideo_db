const {faker} = require('@faker-js/faker');

function createRandomAddressBook() {
    return {
      city: faker.address.city(),
      street: faker.address.street(),
      building: faker.address.buildingNumber(),
      entrance: faker.datatype.number({min:0, max:100}),
      apartment: faker.datatype.number({min:0, max: 100}),
      commentary: faker.lorem.sentence(5),
    };
}

module.exports.createRandomAddressBookService = function(n) {
    let arr = [];
    Array.from({ length: n }).forEach(() => {
        arr.push(createRandomAddressBook());
    });
    return arr;
}