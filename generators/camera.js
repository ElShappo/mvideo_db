const {faker} = require('@faker-js/faker');

function createRandomItem() {
    return {
      matrix_resolution: faker.datatype.number({min: 10, max: 20}),
      zoom: faker.datatype.number({min: 10, max: 200}),
      matrix_size: faker.helpers.arrayElements([100, 200, 300, 400, 500], 2),
      focus_min: faker.datatype.number({min: 10, max: 50}),
      focus_max: faker.datatype.number({min: 51, max: 80}),
      quality: faker.helpers.arrayElement(['Ultra HD', 'HD', 'Super HD']),
      matrix_type: faker.helpers.arrayElement(['Exmor R CMOS', 'CMOS']),
      frame_frequency: faker.datatype.number({min: 5, max: 25}),
      is_wifi: faker.datatype.boolean()
    };
}

module.exports.createRandomCameraService = function(n) {
    let arr = [];
    Array.from({ length: n }).forEach(() => {
        arr.push(createRandomItem());
    });
    return arr;
}