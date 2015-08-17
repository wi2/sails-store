import {EventEmitter} from 'events'
import {Transport} from './transport.js'

export class Store extends EventEmitter {
  constructor(props) {
    super(props);
    this.belongs = props.belongs;
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
  maj(data) {
    this._value = this._value.set('data',data)
  }

  // onChange(msg) {}
}
