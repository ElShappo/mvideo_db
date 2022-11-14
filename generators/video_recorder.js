const {faker} = require('@faker-js/faker');

function createRandomRecorder() {
    return {
      fps: faker.helpers.arrayElement(['30', '40']),
      viewing_angle: faker.datatype.number({min: 140, max: 170}),
      max_frame_frequency: faker.datatype.number({min: 30, max: 35}),
      max_resolution: faker.datatype.number({min: 4, max: 10}),
      is_night_shooting: faker.datatype.boolean(),
      recording_interval: faker.helpers.arrayElement(['10', '15'])
    };
}

module.exports.createRandomVideoRecorderService = function(n) {
    let arr = [];
    Array.from({ length: n }).forEach(() => {
        arr.push(createRandomRecorder());
    });
    return arr;
}