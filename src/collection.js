import {Store} from './base.js'

export class StoreCollection extends Store {
  constructor(props) {
    super(props);
    this.value = props.items||[];
    this.items = props.items;
    this.on('sync', this.findAndUpdate.bind(this));
  }
  create(data) {
    if (typeof io !== "undefined")
      io.socket.post(this.url, data, this.add.bind(this));
  }
  delete(id) {
    if (typeof io !== "undefined")
      io.socket.delete(this.url+"/"+id, {}, this.remove.bind(this));
  }
  add(data) {
    this.value.push(data);
    this.emit('add', this.value);
  }
  remove(id) {
    if (id.id)
      id = id.id;
    var newVal = this.value.filter(function(elem) {return elem.id !== id;});
    this.value = newVal;
    this.emit('remove', this.value);
  }
  findAndUpdate(data) {
    for (var i=0,len=this.value.length;i<len;i++){
      if (this.value[i].id === data.id)
        this.value[i] = data;
    }
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

