import {Store} from './store.js'

export class StoreCollection extends Store {
  constructor(props) {
    super(props);
    this._value = props.value||props.items||[];
    this.on('sync', this.findAndUpdate.bind(this));
  }

  get value() {
    return this._value;
  }
  set value(data) {
    this._value = data;
  }

  post(data) {
    this.socket.post(data, this.add.bind(this));
  }
  delete(id) {
    this.socket.delete(id, this.remove.bind(this));
  }

  add(data) {
    this.value.push(data);
    this.emit('add', this.value);
  }
  remove(id) {
    if (id.id)
      id = id.id;
    var newVal = this.value.filter((elem) => {return elem.id !== id;});
    this.value = newVal;
    this.emit('remove', this.value);
  }

  findAndUpdate(data) {
    for (var i=0, len=this.value.length; i < len; i++)
      if (this.value[i].id === data.id)
        this.objectAssign(this.value[i], data);
  }

  onChange (msg) {
    switch(msg.verb) {
      case "created":
        this.add(msg.data);
        break;
      case "updated":
        this.value = msg.data;
        break;
      case "destroyed":
        this.remove(msg.id);
        break;
    }
  }
}
