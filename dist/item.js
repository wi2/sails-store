'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _storeJs = require('./store.js');

var _immutableStore = require('immutable-store');

var _immutableStore2 = _interopRequireDefault(_immutableStore);

var _transportJs = require('./transport.js');

var StoreItem = (function (_Store) {
  function StoreItem(props) {
    _classCallCheck(this, StoreItem);

    _get(Object.getPrototypeOf(StoreItem.prototype), 'constructor', this).call(this, props);
    this.socket = new _transportJs.Transport(props); //identity & root
    this.startListening();
    this._value = (0, _immutableStore2['default'])({ data: props.value || props.item || {} });
  }

  _inherits(StoreItem, _Store);

  _createClass(StoreItem, [{
    key: 'put',
    value: function put(data) {
      this.socket.put(data, this.update.bind(this));
    }
  }, {
    key: 'update',
    value: function update(data) {
      if (Array.isArray(data)) return;
      var tmp = this.value.merge(data);
      this._value = Array.isArray(tmp.data) ? this._value.set('data', data) : tmp;
      this.emit('update', this.value);
    }
  }, {
    key: 'onChange',
    value: function onChange(msg) {
      if (msg.verb === 'updated' && msg.data && msg.id == this.value.id) {
        this.update(msg.data);
      }
    }
  }, {
    key: 'value',
    get: function get() {
      return this._value.data;
    }
  }]);

  return StoreItem;
})(_storeJs.Store);

exports.StoreItem = StoreItem;