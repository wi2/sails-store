import {Base} from './base.js'
import {Transport} from './transport.js'

export class Store extends Base {
  constructor(props) {
    super(props);
    this.socket = new Transport({
      identity: props.identity,
      root: props.root
    });
    this.socket.on(this.onChange.bind(this));
  }
  init(data) {
    this.value = data;
  }
  get () {
    this.socket.get(this.update.bind(this));
  }
  update(data) {
    this.value = data;
    this.emit('update', this.value);
    if (this.belongs)
      this.belongs.emit('sync', this.value);
  }
  onChange(msg) {}
}
