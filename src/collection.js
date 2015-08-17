import {Store} from './store.js'
import ImmutStore from 'immutable-store'

export class StoreCollection extends Store {
  constructor(props) {
    super(props);
    this._value = ImmutStore({data: props.value||props.items||[]});
    this.on('sync', this.findAndUpdate.bind(this));
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
    this._value = this.value.splice(this.value.find((v) => v.id === id),1);
    this.emit('remove', this.value);
  }
  update(data) {
    this._value = this._value.set('data',data);
    this.emit('update', this.value);
    if (this.belongs)
      this.belongs.emit('sync', this.value);
  }

  findAndUpdate(data) {
    for (var i=0, len=this.value.length; i < len; i++) {
      if (this.value[i].id === data.id) {
        this._value = this.value[i].merge(data);
      }
    }
  }

  onChange (msg) {
    switch(msg.verb) {
      case "created":
        this.add(msg.data);
        break;
      case "updated":
        this.update(msg.data);
        break;
      case "destroyed":
        this.remove(msg.id);
        break;
    }
  }
}
