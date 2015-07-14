import {Store} from './store.js'

export class StoreItem extends Store {
  constructor(props) {
    super(props);
    this.value = props.value||{};
    this.socket.adjustUrlWithId(this.value.id);
  }
  setItems(data) {
    this.value = data;
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
