import {Store} from './store.js'
import ImmutStore from 'immutable-store'
import {Transport} from './transport.js'

export class StoreCollection extends Store {
  constructor(props) {
    super(props);
    this.socket = new Transport(props);//identity & root
    this.startListening();
    this._value = ImmutStore({data: props.value||props.items||[]});
  }

  get value() {
    return this._value.data;
  }
  post(data) {
    this.socket.post(data, this.add.bind(this));
  }
  delete(id) {
    this.socket.delete(id, this.remove.bind(this));
  }

  add(data) {
    this._value = this.value.push(data);
    this.emit('add', this.value);
  }
  remove(id) {
    if (id.id)
      id = id.id;
    var key;
    for(var i=0, len=this.value.length; i<len; i++) {
      if (this.value[i].id == id) {
        key = i;
      }
    }
    this._value = this.value.splice(key,1)
    this.emit('remove', this.value);
  }
  update(data) {
    this._value = this._value.set('data',data);
    this.emit('update', this.value);
  }

  findAndUpdate(data, id) {
    for (var i=0, len=this.value.length; i < len; i++) {
      if (this.value[i].id === id) {
        data.id = id;
        var tmp = {};
        this.objectAssign(tmp, this.value[i], data);
        this._value = this.value.splice(i, 1, tmp);
      }
    }
    this.emit('update', this.value);
  }

  onChange (msg) {
    switch(msg.verb) {
      case "created":
        this.add(msg.data);
        break;
      case "updated":
        this.findAndUpdate(msg.data, msg.id);
        break;
      case "destroyed":
        this.remove(msg.id);
        break;
    }
  }
}
