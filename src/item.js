import {Store} from './store.js'
import ImmutStore from 'immutable-store'
import {Transport} from './transport.js'

export class StoreItem extends Store {
  constructor(props){
    super(props);
    this.socket = new Transport(props);//identity & root
    this.startListening();
    this._value = ImmutStore({data: props.value||props.item||{}});
  }
  get value() {
    return this._value.data;
  }
  put(data) {
    this.socket.put(data, this.update.bind(this));
  }
  update(data) {
    if (Array.isArray(data)) return;
    var tmp = this.value.merge(data);
    this._value = Array.isArray(tmp.data) ? this._value.set('data', data) : tmp;
    this.emit('update', this.value);
  }
  onChange(msg) {
    if (msg.verb === 'updated' && msg.data && msg.id == this.value.id) {
      this.update(msg.data);
    }
  }
}
