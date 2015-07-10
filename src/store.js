import {Base} from './base.js'

export class Store extends Base {
  constructor(props) {
    super(props);
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
    if (this.belongs){
      this.belongs.emit('sync', this.value);
    }
  }
  onChange(msg) {}
}
