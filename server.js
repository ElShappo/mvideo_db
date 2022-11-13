const {DAO} = require('./DAO');

(async () => {
    let interface = new DAO();

    interface.addRandomUsers(10);
    interface.addRandomAddress_books(10);
    // interface.addRandomManufacturer(10);
    // interface.addRandomItems(10);
    // interface.addRandomCarts(10);
    // interface.addRandomFavourite_items(10);
    // interface.addRandomStores(10);
    // interface.addRandomFavourite_stores(10);
      
})();
