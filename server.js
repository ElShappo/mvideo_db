'use strict';
const {faker} = require('@faker-js/faker');
const {retrieveArray, User, Address_book, Manufacturer, Item, Cart, Favourite_item, Store, Favourite_store, Order, Items_within_store, Items_within_order} = require('./utils')

// import generators 
const {createRandomUserService} = require('./generators/user');
const {createRandomItemService} = require('./generators/item');
const {createRandomStoreService} = require('./generators/store');
const {createRandomAddressBookService} = require('./generators/address_book');
const {createRandomCartService} = require('./generators/cart');
const {createRandomOrderService} = require('./generators/order');
const {createRandomManufacturerService} = require('./generators/manufacturer');

// generate fake data for tables
let users = createRandomUserService(10); // PRIMARY
let address_books = createRandomAddressBookService(10); // FK: user_id -> id (user)
let manufacturers = createRandomManufacturerService(10); // PRIMARY
let items = createRandomItemService(10); // FK: manufacturer_id -> id (manufacturer)
let carts = createRandomCartService(10); // FK: user_id -> id (user), FK: item_id -> id (item)
let favourite_items = new Array(10); // doesn't have its own generator because this table is comprised of FK's only
let stores = createRandomStoreService(10); // PRIMARY
let favourite_stores = new Array(10); // doesn't have its own generator because this table is comprised of FK's only
let orders = createRandomOrderService(30); // FK: user_id -> id (user)
let items_within_stores = new Array(10); // doesn't have its own generator because this table is comprised of FK's only
let items_within_orders = new Array(10); // doesn't have its own generator because this table is comprised of FK's only

console.log(users);
console.log(address_books);
console.log(manufacturers);
console.log(items);
console.log(carts);
console.log(favourite_items);
console.log(stores);
console.log(favourite_stores);
console.log(orders);
console.log(items_within_stores);
console.log(items_within_orders);

(async () => {
      const createdUsers = await User.bulkCreate(users);

      for (let i=0; i<address_books.length; ++i) {
        address_books[i] = Object.assign({user_id: createdUsers.at(i).id}, address_books[i]);
      }

      await Address_book.bulkCreate(address_books); 
      const createdManufacturers = await Manufacturer.bulkCreate(manufacturers);

      for (let i=0; i<items.length; ++i) {
        let availableIds = retrieveArray(createdManufacturers);
        let randomId = faker.helpers.arrayElement(availableIds);
        items[i] = Object.assign(items[i], {manufacturer_id: faker.helpers.arrayElement(availableIds)});
      }

      const createdItems = await Item.bulkCreate(items);

      for (let i=0; i<carts.length; ++i) {
        let availableUserIds = retrieveArray(createdUsers);
        let availableItemIds = retrieveArray(createdItems);

        let randomUserId = 0;
        let randomItemId = 0;

        while (true) {
        // this loop ensures that generated userId and itemId make up unique sequence (i.e. PK)
          let toBreak = true;

          randomUserId = faker.helpers.arrayElement(availableUserIds);
          randomItemId = faker.helpers.arrayElement(availableItemIds);

          let mergedRandom = randomUserId.toString() + randomItemId.toString();

          for (let j=0; j<i; ++j) {
            let mergedPresent = carts[j].user_id.toString() + carts[j].item_id.toString();

            if (mergedPresent === mergedRandom) {
              toBreak = false;
              break;
            }
          }
          if (toBreak) {
            break;
          }
        }
        carts[i] = Object.assign({user_id: randomUserId, item_id: randomItemId}, carts[i]);
      }

      await Cart.bulkCreate(carts);

      for (let i=0; i<favourite_items.length; ++i) {
        let availableUserIds = retrieveArray(createdUsers);
        let availableItemIds = retrieveArray(createdItems);

        let randomUserId = 0;
        let randomItemId = 0;

        while (true) {
        // this loop ensures that generated userId and itemId make up unique sequence (i.e. PK)
          let toBreak = true;

          randomUserId = faker.helpers.arrayElement(availableUserIds);
          randomItemId = faker.helpers.arrayElement(availableItemIds);

          let mergedRandom = randomUserId.toString() + randomItemId.toString();

          for (let j=0; j<i; ++j) {
            let mergedPresent = favourite_items[j].user_id.toString() + favourite_items[j].item_id.toString();

            if (mergedPresent === mergedRandom) {
              toBreak = false;
              break;
            }
          }
          if (toBreak) {
            break;
          }
        }
        favourite_items[i] = {user_id: randomUserId, item_id: randomItemId};
      }

      await Favourite_item.bulkCreate(favourite_items);

      const createdStores = await Store.bulkCreate(stores);

      for (let i=0; i<favourite_stores.length; ++i) {
        let availableUserIds = retrieveArray(createdUsers);
        let availableStoreIds = retrieveArray(createdStores);

        let randomUserId = 0;
        let randomStoreId = 0;

        while (true) {
        // this loop ensures that generated userId and itemId make up unique sequence (i.e. PK)
          let toBreak = true;

          randomUserId = faker.helpers.arrayElement(availableUserIds);
          randomStoreId = faker.helpers.arrayElement(availableStoreIds);

          let mergedRandom = randomUserId.toString() + randomStoreId.toString();

          for (let j=0; j<i; ++j) {
            let mergedPresent = favourite_stores[j].user_id.toString() + favourite_stores[j].store_id.toString();

            if (mergedPresent === mergedRandom) {
              toBreak = false;
              break;
            }
          }
          if (toBreak) {
            break;
          }
        }
        favourite_stores[i] = {user_id: randomUserId, store_id: randomStoreId};
      }

      await Favourite_store.bulkCreate(favourite_stores);

      for (let i=0; i<orders.length; ++i) {
        let availableIds = retrieveArray(createdUsers);
        let randomId = faker.helpers.arrayElement(availableIds);
        orders[i] = Object.assign({user_id: randomId}, orders[i]);
      }

      const createdOrders = await Order.bulkCreate(orders); 

      for (let i=0; i<items_within_stores.length; ++i) {
        let availableItemIds = retrieveArray(createdItems);
        let availableStoreIds = retrieveArray(createdStores);

        let randomItemId = 0;
        let randomStoreId = 0;

        while (true) {
        // this loop ensures that generated userId and itemId make up unique sequence (i.e. PK)
          let toBreak = true;

          randomItemId = faker.helpers.arrayElement(availableItemIds);
          randomStoreId = faker.helpers.arrayElement(availableStoreIds);

          let mergedRandom = randomItemId.toString() + randomStoreId.toString();

          for (let j=0; j<i; ++j) {
            let mergedPresent = items_within_stores[j].item_id.toString() + items_within_stores[j].store_id.toString();

            if (mergedPresent === mergedRandom) {
              toBreak = false;
              break;
            }
          }
          if (toBreak) {
            break;
          }
        }
        items_within_stores[i] = {store_id: randomStoreId, item_id: randomItemId};
      }

      await Items_within_store.bulkCreate(items_within_stores);


      for (let i=0; i<items_within_orders.length; ++i) {
        let availableItemIds = retrieveArray(createdItems);
        let availableOrderIds = retrieveArray(createdOrders);

        let randomItemId = 0;
        let randomOrderId = 0;

        while (true) {
        // this loop ensures that generated userId and itemId make up unique sequence (i.e. PK)
          let toBreak = true;

          randomItemId = faker.helpers.arrayElement(availableItemIds);
          randomOrderId = faker.helpers.arrayElement(availableOrderIds);

          let mergedRandom = randomItemId.toString() + randomOrderId.toString();

          for (let j=0; j<i; ++j) {
            let mergedPresent = items_within_orders[j].item_id.toString() + items_within_orders[j].order_id.toString();

            if (mergedPresent === mergedRandom) {
              toBreak = false;
              break;
            }
          }
          if (toBreak) {
            break;
          }
        }
        items_within_orders[i] = {order_id: randomOrderId, item_id: randomItemId};
      }

      await Items_within_order.bulkCreate(items_within_orders);


  
    })();
