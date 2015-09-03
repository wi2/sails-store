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

    it('should emit an created event and have 2 records', function() {
      store.add({name:'Mike', id:1, job: 'developer'});
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
        assert.equal(data.length, 2);
      });
      store.onChange({verb: 'updated', data: {name:"Johnny", job:"designer"}, id:2});
    });
    it('should update one record (the name become Michael and is still a developer and id=1)', function() {
      store.findAndUpdate({name:"Michael"}, 1);
      assert.equal(store.value[0].name, 'Michael');
      assert.equal(store.value[0].job, 'developer');
      assert.equal(store.value[0].id, 1);
    });
    it('should emit a destroyed event and have 1 record', function(done) {
      store.on('remove', function(data){
        assert.equal(data.length, 1);
        done()
      });
      store.onChange({verb: 'destroyed', id: 1});
    });

  });

});
