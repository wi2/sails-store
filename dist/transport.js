'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Transport = (function () {
  function Transport(props) {
    _classCallCheck(this, Transport);

    this.identity = props.identity;
    this.url = (props.root || '/') + this.identity + (props.value && props.value.id ? '/' + props.value.id : '');
    this.socket = typeof io !== 'undefined' ? io.socket : null;
  }

  _createClass(Transport, [{
    key: 'on',
    value: function on(cb) {
      if (!this.socket) return;
      this.socket.on(this.identity, cb);
    }
  }, {
    key: 'off',
    value: function off() {
      if (!this.socket) return;
      this.socket.off(this.identity);
    }
  }, {
    key: 'get',
    value: function get(data, cb) {
      if (typeof data === 'function') cb = data;
      if (!this.socket) return;
      this.socket.get(this.url, cb);
    }
  }, {
    key: 'post',
    value: function post(data, cb) {
      if (!this.socket) return;
      this.socket.post(this.url, data, cb);
    }
  }, {
    key: 'put',
    value: function put(data, cb) {
      if (!this.socket) return;
      this.socket.put(this.url, data, cb);
    }
  }, {
    key: 'delete',
    value: function _delete(id, cb) {
      if (!this.socket || !id) return;
      this.socket['delete'](this.url + '/' + id, {}, cb);
    }
  }]);

  return Transport;
})();

exports.Transport = Transport;