import {EventEmitter} from 'events'

export class Base extends EventEmitter {
  constructor(props) {
    super(props);
    this.belongs = props.belongs;
  }
}
