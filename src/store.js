import {EventEmitter} from 'events'
import objectAssign from 'object-assign'
import {Transport} from './transport.js'

export class Store extends EventEmitter {
  constructor(props) {
    super(props);
    this.belongs = props.belongs;
    this.socket = new Transport(props);//identity & root
    this.startListening();
  }

  objectAssign(...col) {
    objectAssign(...col);
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

  get() {
    this.socket.get(this.update.bind(this));
  }
  put() {}
  post(data) {}
  delete(id) {}

  add(data) {}
  remove(id) {}
  update(data) {
    this.value = data;
    this.emit('update', this.value);
    if (this.belongs)
      this.belongs.emit('sync', this.value);
  }

  onChange(msg) {}
}
