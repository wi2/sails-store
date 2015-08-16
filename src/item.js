import {Store} from './store.js'

export class StoreItem extends Store {
  constructor(props){
    super(props);
    this._value = props.value||props.item||{};
  }

  get value() {
    return this._value;
  }
  set value(data) {
    this.objectAssign(this._value, data);
  }

  put(data) {
    this.socket.put(data, this.update.bind(this));
  }

  onChange(msg) {
    if (msg.verb === 'updated' && msg.id === this.value.id) {
      this.update(msg.data);
    }
  }


}
