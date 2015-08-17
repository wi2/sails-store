const assert = require('assert');
const StoreCollection = require('../index.js').StoreCollection;


describe('collection testing', function() {

  var store;

  before(function(done) {
    store = new StoreCollection({
      identity: "user"
    });
    done()
  });

  describe('collection', function() {

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
    it('should emit a destroyed event and have 2 record', function(done) {
      store.on('remove', function(data){
        assert.equal(data.length, 2);
        done()
      });
      store.onChange({verb: 'destroyed', id: 1});
    });
    it('should update one item of store', function() {
      store.emit('sync', {id:2, name:"Bobby"});
      assert.equal("Bobby", store.value[1].name);
    });


  });

});
