import {EventEmitter} from 'events'
import objectAssign from 'object-assign'
import {Transport} from './transport.js'

export class Store extends EventEmitter {
  constructor(props) {
    super(props);
    this.socket = new Transport(props);//identity & root
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

  get() {
    this.socket.get(this.update.bind(this));
  }
  // put() {}
  // post(data) {}
  // delete(id) {}

  // add(data) {}
  // remove(id) {}
  // update(data) {}

  // onChange(msg) {}

  objectAssign(...col) {
    objectAssign(...col);
  }
}
