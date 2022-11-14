const {faker} = require('@faker-js/faker');

function createRandomItem() {
    return {
      color: faker.color.rgb(),
      freezer_volume: faker.datatype.number({min: 10, max: 200}),
      cooling_chamber_volume: faker.datatype.number({min: 10, max: 50}), 
      is_freezer_frost: faker.datatype.boolean(),
      is_cooling_frost: faker.datatype.boolean(),
      is_indication: faker.datatype.boolean(), 
      regulated_shelves_number: faker.datatype.number({min: 1, max: 5}), 
      control_type: faker.helpers.arrayElement(['electronic', 'mechanics', 'electromechanics'])
    };
}

module.exports.createRandomFridgeService = function(n) {
    let arr = [];
    Array.from({ length: n }).forEach(() => {
        arr.push(createRandomItem());
    });
    return arr;
}