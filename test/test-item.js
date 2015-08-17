const assert = require('assert');
const StoreItem = require('../index.js').StoreItem;


describe('item testing', function() {

  var item;

  before(function(done) {
    item = new StoreItem({
      identity: 'user',
      value: {id: 1, name: 'Mike'}
    });
    done()
  });

  describe('item', function() {
    it('id should equal to 1', function() {
      assert.equal(item.value.id, 1);
    });
    it('name should equal to Mike', function() {
      assert.equal(item.value.name, 'Mike');
    });
    it('name should not equal to Mike', function() {
      item.update({name: 'Bob'});
      assert.notEqual(item.value.name, 'Mike');
    });
    it('name should equal to Bob', function() {
      assert.equal(item.value.name, 'Bob');
    });
    it('id still should equal to 1', function() {
      assert.equal(item.value.id, 1);
    });
    it('url should equal /user/1', function() {
      item.update({id: 2, name: 'Paul'});
      assert.equal(item.socket.url, '/user/1');
    });
    it('url should not equal /user/2', function() {
      item.update({id: 2, name: 'Paul'});
      assert.notEqual(item.socket.url, '/user/2');
    });
    it('should update name to Jo', function() {
      item.update({name: 'Jo'});
      assert.equal(item.value.name, 'Jo');
    });
    it('should emit a updated event and return an object have Name is Johnny', function() {
      item.on('update', function(data){
        assert.equal(data.name, 'Johnny');
      });
      item.onChange({verb: 'updated', data:{name:"Johnny"}});
    });
  });

});
