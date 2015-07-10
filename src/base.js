import {EventEmitter} from 'events'

export class Base extends EventEmitter {
  constructor(props) {
    super(props);
    this.identity = props.identity;
    this.belongs = props.belongs;
  }
}



