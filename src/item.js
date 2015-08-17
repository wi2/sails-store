import {Store} from './store.js'
import ImmutStore from 'immutable-store'

export class StoreItem extends Store {
  constructor(props){
    super(props);
    this._value = ImmutStore({data: props.value||props.item||{}});
  }

  get value() {
    return this._value.data;
  }
  set value(data) {
    if (data.id)
      delete data.id;
    this._value = this._value.data.merge(data)
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
