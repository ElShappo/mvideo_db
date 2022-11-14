// const {faker} = require('@faker-js/faker');
// const {retrieveArray, User, Address_book, Manufacturer, Item, Cart, Favourite_item, Store, Favourite_store} = require('./utils')

// // import generators 
// const {createRandomUserService} = require('./generators/user');
// const {createRandomItemService} = require('./generators/item');
// const {createRandomStoreService} = require('./generators/store');
// const {createRandomAddressBookService} = require('./generators/address_book');
// const {createRandomCartService} = require('./generators/cart');
// const {createRandomOrderService} = require('./generators/order');
// const {createRandomManufacturerService} = require('./generators/manufacturer');

// module.exports.DAO = class {
//     // tables
//     users;              // PRIMARY
//     address_books;      // FK: user_id -> id (user)
//     manufacturers;      // PRIMARY
//     items;              // FK: manufacturer_id -> id (manufacturer)
//     carts;              // FK: user_id -> id (user), FK: item_id -> id (item)
//     favourite_items;    // doesn't have its own generator because this table is comprised of FK's only
//     stores;             // PRIMARY
//     favourite_stores;   // doesn't have its own generator because this table is comprised of FK's only
//     // orders = createRandomOrderService(3);

//     createdUsers;
//     createdAddress_Books;
//     createdManufacturers;
//     createdItems;
//     createdCarts;
//     createdFavouriteItems;
//     createdStores;
//     createdFavouriteStores;

//     constructor() {
//         // console.log(this.users);
//         // console.log(this.address_books);
//         // console.log(this.manufacturers);
//         // console.log(this.items);
//         // console.log(this.carts);
//         // console.log(this.favourite_items);
//         // console.log(this.stores);
//         // console.log(this.favourite_stores);
//         // console.log(this.orders);
//     }

//     async addRandomUsers(n) {
//         this.users = createRandomUserService(n);
//         this.createdUsers = await User.bulkCreate(this.users);
//     }
//     async addRandomAddress_books(n) {
//         this.address_books = createRandomAddressBookService(n);
//         for (let i=0; i<this.address_books.length; ++i) {
//             this.address_books[i] = Object.assign({user_id: this.createdUsers.at(i).id}, this.address_books[i]);
//         }
//         this.createdAddress_Books = await Address_book.bulkCreate(this.address_books);
//     }
//     async addRandomManufacturer(n) {
//         this.manufacturers = createRandomManufacturerService(n);
//         this.createdManufacturers = await Manufacturer.bulkCreate(this.manufacturers);
//     }
//     async addRandomItems(n) {
//         this.items = createRandomItemService(n);
    
//         for (let i=0; i<this.items.length; ++i) {
//             let availableIds = retrieveArray(this.createdManufacturers);
//             let randomId = faker.helpers.arrayElement(availableIds);
//             this.items[i] = Object.assign(this.items[i], {manufacturer_id: faker.helpers.arrayElement(availableIds)});
//         }
    
//         this.createdItems = await Item.bulkCreate(this.items);
//     }
//     async addRandomCarts(n) {
//         this.carts = createRandomCartService(n);

//         for (let i=0; i<this.carts.length; ++i) {
//             let availableUserIds = retrieveArray(this.createdUsers);
//             let availableItemIds = retrieveArray(this.createdItems);
    
//             let randomUserId = 0;
//             let randomItemId = 0;
    
//             while (true) {
//             // this loop ensures that generated userId and itemId make up unique sequence (i.e. PK)
//               let toBreak = true;
    
//               randomUserId = faker.helpers.arrayElement(availableUserIds);
//               randomItemId = faker.helpers.arrayElement(availableItemIds);
    
//               let mergedRandom = randomUserId.toString() + randomItemId.toString();
    
//               for (let j=0; j<i; ++j) {
//                 let mergedPresent = this.carts[j].user_id.toString() + this.carts[j].item_id.toString();
    
//                 if (mergedPresent === mergedRandom) {
//                   toBreak = false;
//                   break;
//                 }
//               }
//               if (toBreak) {
//                 break;
//               }
//             }
//             this.carts[i] = Object.assign({user_id: randomUserId, item_id: randomItemId}, this.carts[i]);
//         }
//         await Cart.bulkCreate(this.carts);
//     }
//     async addRandomFavourite_items(n) {
//         this.favourite_items = new Array(n);

//         for (let i=0; i<this.favourite_items.length; ++i) {
//             let availableUserIds = retrieveArray(this.createdUsers);
//             let availableItemIds = retrieveArray(this.createdItems);
    
//             let randomUserId = 0;
//             let randomItemId = 0;
    
//             while (true) {
//             // this loop ensures that generated userId and itemId make up unique sequence (i.e. PK)
//               let toBreak = true;
    
//               randomUserId = faker.helpers.arrayElement(availableUserIds);
//               randomItemId = faker.helpers.arrayElement(availableItemIds);
    
//               let mergedRandom = randomUserId.toString() + randomItemId.toString();
    
//               for (let j=0; j<i; ++j) {
//                 let mergedPresent = this.favourite_items[j].user_id.toString() + this.favourite_items[j].item_id.toString();
    
//                 if (mergedPresent === mergedRandom) {
//                   toBreak = false;
//                   break;
//                 }
//               }
//               if (toBreak) {
//                 break;
//               }
//             }
//             this.favourite_items[i] = {item_id: randomItemId, user_id: randomUserId};
//         }
//         await Favourite_item.bulkCreate(this.favourite_items);
//     }
//     async addRandomStores(n) {
//         this.stores = createRandomStoreService(n);
//         this.createdStores = await Store.bulkCreate(this.stores);
//     }
//     async addRandomFavourite_stores(n) {
//         this.favourite_stores = new Array(n);

//         for (let i=0; i<this.favourite_stores.length; ++i) {
//             let availableUserIds = retrieveArray(this.createdUsers);
//             let availableStoreIds = retrieveArray(this.createdStores);
    
//             let randomUserId = 0;
//             let randomStoreId = 0;
    
//             while (true) {
//             // this loop ensures that generated userId and itemId make up unique sequence (i.e. PK)
//               let toBreak = true;
    
//               randomUserId = faker.helpers.arrayElement(availableUserIds);
//               randomStoreId = faker.helpers.arrayElement(availableStoreIds);
    
//               let mergedRandom = randomUserId.toString() + randomStoreId.toString();
    
//               for (let j=0; j<i; ++j) {
//                 let mergedPresent = this.favourite_stores[j].user_id.toString() + this.favourite_stores[j].store_id.toString();
    
//                 if (mergedPresent === mergedRandom) {
//                   toBreak = false;
//                   break;
//                 }
//               }
//               if (toBreak) {
//                 break;
//               }
//             }
//             this.favourite_stores[i] = {user_id: randomUserId, store_id: randomStoreId};
//         }
//         await Favourite_store.bulkCreate(this.favourite_stores);
//     }
// }