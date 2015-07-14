var assert = require('assert');
var Store = require('./index.js').Store;
var StoreItem = require('./index.js').StoreItem;
var StoreCollection = require('./index.js').StoreCollection;


describe('Simulate wevsocket events with onChange function', function() {

  describe('When use StoreCollection', function() {
    var store;
    before(function(done) {
      store = new StoreCollection({
        identity: "user"
      });
      done()
    });
    it('url should equal to /user', function() {
      assert.equal(store.socket.url, '/user');
    });
    it('listening should equal true', function() {
      assert.equal(store.listening, true);
    });
    it('listening should equal false', function() {
      store.stopListening();
      assert.equal(store.listening, false);
    });
    it('should event sync is a function', function() {
      assert.equal(typeof store._events.sync, 'function');
    });
    it('should emit an created event and have 2 records', function() {
      store.add({name:'Mike', id:1});
      store.on('add', function(data){
        assert.equal(data[0].name, 'Mike');
        assert.equal(data.length, 2);
      });
      store.onChange({verb: 'created', data: {id:2, name:"John"}});
    });
    it('should emit a updated event and return an object have Name is Johnny', function() {
      store.on('update', function(data){
        assert.equal(data[1].name, 'Johnny');
        assert.equal(data.length, 3);
      });
      store.onChange({verb: 'updated', data: [{id:1, name:"Mike"}, {id:2, name:"Johnny"}, {id:3, name:"Paul"}]});
    });
    it('should emit a desroyed event and have 2 record', function() {
      store.on('remove', function(data){
        assert.equal(data.length, 2);
      });
      store.onChange({verb: 'destroyed', id: 1});
    });
  });

  describe('When use StoreItem', function() {
    var storeI;
    before(function(done) {
      storeI = new StoreItem({
        identity: "user",
        value: {id: 5, name: 'Mike'}
      });
      done()
    });
    it('url should equal to /user/5', function() {
      assert.equal(storeI.socket.url, '/user/5');
    });
    it('listening should equal true', function() {
      assert.equal(storeI.listening, true);
    });
    it('listening should equal false', function() {
      storeI.stopListening();
      assert.equal(storeI.listening, false);
    });
    it('url should equal /user/1', function() {
      storeI.setItems({id: 1, name: 'Paul'});
      assert.equal(storeI.socket.url, '/user/1');
    });
    it('should emit a updated event and return an object have Name is Johnny', function() {
      storeI.on('update', function(data){
        assert.equal(data.name, 'Johnny');
      });
      storeI.onChange({verb: 'updated', data:{name:"Johnny"}});
    });
  });


});
