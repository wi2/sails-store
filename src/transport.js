
export class Transport {
  constructor(props) {
    this.identity = props.identity;
    this.url = (props.root||"/") + this.identity + (props.value && props.value.id ? '/'+props.value.id : '');
    this.socket = typeof io !== "undefined" ? io.socket : null;
  }

  on(cb) {
    if (!this.socket) return;
    this.socket.on(this.identity, cb);
  }
  off() {
    if (!this.socket) return;
    this.socket.off(this.identity);
  }
  get(data, cb) {
    if (typeof data === 'function')
      cb = data;
    if (!this.socket) return;
    this.socket.get(this.url, cb);
  }
  post(data, cb) {
    if (!this.socket) return;
    this.socket.post(this.url, data, cb);
  }
  put(data, cb) {
    if (!this.socket) return;
    this.socket.put(this.url, data, cb);
  }
  delete(id, cb) {
    if (!this.socket || !id) return;
    this.socket.delete(this.url+"/"+id, {}, cb);
  }
}
