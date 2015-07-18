'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _baseJs = require('./base.js');

var _transportJs = require('./transport.js');

var Store = (function (_Base) {
  function Store(props) {
    _classCallCheck(this, Store);

    _get(Object.getPrototypeOf(Store.prototype), 'constructor', this).call(this, props);
    this.socket = new _transportJs.Transport({
      identity: props.identity,
      root: props.root
    });
    this.listening = false;
    this.startListening();
  }

  _inherits(Store, _Base);

  _createClass(Store, [{
    key: 'startListening',
    value: function startListening() {
      if (this.listening) return;
      this.listening = true;
      this.socket.on(this.onChange.bind(this));
    }
  }, {
    key: 'stopListening',
    value: function stopListening() {
      this.socket.off();
      this.listening = false;
    }
  }, {
    key: 'get',
    value: function get() {
      this.socket.get(this.update.bind(this));
    }
  }, {
    key: 'update',
    value: function update(data) {
      this.setItems(data);
      this.emit('update', this.value);
      if (this.belongs) this.belongs.emit('sync', this.value);
    }
  }, {
    key: 'setItems',
    value: function setItems(data) {
      this.objectAssign(this.value, data);
    }
  }, {
    key: 'onChange',
    value: function onChange(msg) {}
  }]);

  return Store;
})(_baseJs.Base);

exports.Store = Store;