import {Base} from './base.js'
import {Transport} from './transport.js'

export class Store extends Base {
  constructor(props) {
    super(props);
    this.socket = new Transport({
      identity: props.identity,
      root: props.root
    });
    this.startListening();
  }
  startListening() {
    if (this.listening) return;
    this.listening = true;
    this.socket.on(this.onChange.bind(this));
  }
  stopListening() {
    this.socket.off();
    this.listening = false;
  }
  get () {
    this.socket.get(this.update.bind(this));
  }
  update(data) {
    this.setItems(data);
    this.emit('update', this.value);
    if (this.belongs)
      this.belongs.emit('sync', this.value);
  }
  setItems(data) {
    this.objectAssign(this.value, data);
  }
  onChange(msg) {}
}
