var assert = require('assert');
var Store = require('../index.js').Store;
var StoreItem = require('../index.js').StoreItem;
var StoreCollection = require('../index.js').StoreCollection;


describe('Simulate websocket events with onChange function', function() {


// var sailsIOClient = require('sails.io.js');
// global.io = sailsIOClient(require('socket.io-client'));
// global.io.sails.url = 'http://localhost:1337';

  // describe('When use StorePostItem', function() {
  //   var storeP;
  //   before(function(done) {
  //     storeP = new StoreItem({
  //       identity: "post",
  //       value: {id: 5}
  //     });
  //     done()
  //   });
  //   it('url should equal data', function(done) {
  //     storeP.socket.get(function(err, data){
  //       assert.equal(storeP.socket.url, '/post/5');
  //       assert.equal(typeof data.body, 'object');
  //       done();
  //     });
  //   });
  //   it('url should equal data', function(done) {
  //     storeP.socket.put({title: 'top'}, function(err, data){
  //       assert.equal(storeP.socket.url, '/post/5');
  //       assert.equal(data.body.title, 'top');
  //       done();
  //     });
  //   });
  //   it('url should equal data', function(done) {
  //     storeP.socket.post({title: 'toptop'}, function(err, data){
  //       assert.equal(storeP.socket.url, '/post/5');
  //       assert.equal(data.body.title, 'toptop');
  //       done();
  //     });
  //   });
  //   it('url should equal data', function(done) {
  //     storeP.socket.delete(storeP.value.id, function(err, data){
  //       assert.equal(typeof storeP.value.title, 'undefined');
  //       done();
  //     });
  //   });
  // });

  // describe('When use StorePostItem', function() {
  //   var storePP;
  //   before(function(done) {
  //     storePP = new StoreCollection({
  //       identity: "post"
  //     });
  //     done()
  //   });
  //   it('url should equal data', function(done) {
  //     storePP.socket.post({title: 'top', content: 'content...'}, function(err, data){
  //       assert.equal(data.body.title, 'top');
  //       done();
  //     });
  //   });
  // });


});
