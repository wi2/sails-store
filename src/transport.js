
export class Transport {
  constructor(props) {
    this.root = props.root||"/";
    this.identity = props.identity;
    this.url = this.root + this.identity;
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
  get(cb) {
    if (!this.socket) return;
    this.socket.get(this.url, cb);
  }
  post(cb) {
    if (!this.socket) return;
    this.socket.post(this.url, data, cb);
  }
  put(cb) {
    if (!this.socket) return;
    this.socket.put(this.url, data, cb);
  }
  delete(id, cb) {
    if (!this.socket || !id) return;
    this.socket.delete(this.url+"/"+id, {}, cb);
  }

  adjustUrlWithId(id) {
    this.url = this.root + this.identity+ "/" + id;
  }
}
