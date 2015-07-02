var assert = require('assert');
var Store = require('./index.js').Store;
var StoreItem = require('./index.js').StoreItem;
var StoreCollection = require('./index.js').StoreCollection;

describe('The reactItemButton component', function() {

  describe('when no props are given', function() {
    var store, storeI, storeC;

    beforeEach(function(done) {
      store = new StoreCollection({
        identity: "user"
      });
      storeI = new StoreItem({
        identity: "user",
        value: {id: 5}
      });
      storeC = new StoreCollection({
        identity: "user",
        items: []
      });
      done()
    });


    it('check url for store class', function() {
      assert.equal(store.url, '/user');
    });
    it('check url for store Item class', function() {
      assert.equal(storeI.url, '/user/5');
    });
    it('check url for store Collection class', function() {
      assert.equal(storeC.url, '/user');
    });

  });


});
