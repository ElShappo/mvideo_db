const {faker} = require('@faker-js/faker');

function createRandomUser() {
    return {
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      patronymic: faker.name.middleName(),
      email: faker.internet.email(),
      gender: faker.name.sexType(),
      date_of_birth: faker.date.birthdate(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      extra_phone: faker.phone.number(),
    };
}

module.exports.createRandomUserService = function(n) {
    let arr = [];
    Array.from({ length: n }).forEach(() => {
        arr.push(createRandomUser());
    });
    return arr;
}