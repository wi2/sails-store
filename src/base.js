import {EventEmitter} from 'events'

export class Store extends EventEmitter {
  constructor(props) {
    super(props);
    this.parentStore = props.store;
    this.identity = props.identity;
    var root = props.root||"/";
    this.url = root + this.identity;
    if (typeof io !== "undefined")
      io.socket.on(this.identity, this.onChange.bind(this));
  }
  init(data) {
    this.value = data;
  }
  get () {
    if (typeof io !== "undefined")
      io.socket.get(this.url, this.update.bind(this));
  }
  update(data) {
    this.value = data;
    this.emit('update', this.value);
    if (this.parentStore){
      this.parentStore.emit('sync', this.value);
    }
  }
  onChange(msg) {}
}



