'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _storeJs = require('./store.js');

var StoreCollection = (function (_Store) {
  function StoreCollection(props) {
    _classCallCheck(this, StoreCollection);

    _get(Object.getPrototypeOf(StoreCollection.prototype), 'constructor', this).call(this, props);
    this._value = props.value || props.items || [];
    this.on('sync', this.findAndUpdate.bind(this));
  }

  _inherits(StoreCollection, _Store);

  _createClass(StoreCollection, [{
    key: 'post',
    value: function post(data) {
      this.socket.post(data, this.add.bind(this));
    }
  }, {
    key: 'delete',
    value: function _delete(id) {
      this.socket['delete'](id, this.remove.bind(this));
    }
  }, {
    key: 'add',
    value: function add(data) {
      this.value.push(data);
      this.emit('add', this.value);
    }
  }, {
    key: 'remove',
    value: function remove(id) {
      if (id.id) id = id.id;
      var newVal = this.value.filter(function (elem) {
        return elem.id !== id;
      });
      this.value = newVal;
      this.emit('remove', this.value);
    }
  }, {
    key: 'findAndUpdate',
    value: function findAndUpdate(data) {
      for (var i = 0, len = this.value.length; i < len; i++) if (this.value[i].id === data.id) this.objectAssign(this.value[i], data);
    }
  }, {
    key: 'onChange',
    value: function onChange(msg) {
      switch (msg.verb) {
        case 'created':
          this.add(msg.data);
          break;
        case 'updated':
          this.value = msg.data;
          break;
        case 'destroyed':
          this.remove(msg.id);
          break;
      }
    }
  }, {
    key: 'value',
    get: function get() {
      return this._value;
    },
    set: function set(data) {
      this._value = data;
    }
  }]);

  return StoreCollection;
})(_storeJs.Store);

exports.StoreCollection = StoreCollection;