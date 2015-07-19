var assert = require('assert');
var Store = require('./index.js').Store;
var StoreItem = require('./index.js').StoreItem;
var StoreCollection = require('./index.js').StoreCollection;

// var sailsIOClient = require('sails.io.js');
// global.io = sailsIOClient(require('socket.io-client'));

// global.io.sails.url = 'http://localhost:1337';

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
    it('should emit a updated event and return an object have Name is Johnny and is a designer', function() {
      store.on('update', function(data){
        assert.equal(data[1].name, 'Johnny');
        assert.equal(data[1].job, 'designer');
        assert.equal(data.length, 3);
      });
      store.onChange({verb: 'updated', data: [{id:1, name:"Mike", job:"developer"}, {id:2, name:"Johnny", job:"designer"}, {id:3, name:"Paul"}]});
    });
    it('should update one record (the name become Michael and is still a developer)', function() {
      store.findAndUpdate({id:1, name:"Michael"});
      assert.equal(store.value[0].name, 'Michael');
      assert.equal(store.value[0].job, 'developer');
    });
    it('should emit a desroyed event and have 2 record', function() {
      store.on('remove', function(data){
        assert.equal(data.length, 2);
      });
      store.onChange({verb: 'destroyed', id: 1});
    });
    it('should update one item of store', function() {
      store.emit('sync', {id:2, name:"Bobby"});
      assert.equal("Bobby", store.value[0].name);
    });

    it('should update one item of store with belongs use', function() {
      var storeI = new StoreItem({
        identity: store.identity,
        value: store.value[0],
        belongs: store
      });
      storeI.update({name: 'Jo'});
      assert.equal("Jo", store.value[0].name);
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
    it('url should equal /user/25', function() {
      storeI.socket.adjustUrlWithId(25);
      assert.equal(storeI.socket.url, '/user/25');
    });
    it('should update name to Jo', function() {
      storeI.update({name: 'Jo'});
    });
    it('should emit a updated event and return an object have Name is Johnny', function() {
      storeI.on('update', function(data){
        assert.equal(data.name, 'Johnny');
      });
      storeI.onChange({verb: 'updated', data:{name:"Johnny"}});
    });
  });


});
