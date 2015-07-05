import {Store} from './base.js'

export class StoreItem extends Store {
  constructor(props) {
    super(props);
    this.value = props.value||{};
    this.url += "/" + this.value.id||'';
  }
  init(data) {
    this.value = data;
    this.url = "/" + this.identity;
    this.url += "/" + this.value.id;
  }
  modify(data) {
    if (typeof io !== "undefined")
      io.socket.put(this.url, data, this.update.bind(this));
  }
  onChange (msg) {
    if (msg.verb === 'updated' && msg.id === this.value.id) {
      this.update(msg.data);
    }
  }
}
