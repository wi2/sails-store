import {Store} from './store.js'

export class StoreItem extends Store {
  constructor(props) {
    super(props);
    this.value = Object.assign({}, props.value);
    this.socket.adjustUrlWithId(this.value.id);
  }
  setItems(data) {
    // Object.assign(this.value, data);
    this.objectAssign(this.value, data);
    this.socket.adjustUrlWithId(this.value.id);
  }
  modify(data) {
    this.socket.put(data, this.update.bind(this));
  }
  onChange (msg) {
    if (msg.verb === 'updated' && msg.id === this.value.id) {
      this.update(msg.data);
    }
  }
}
