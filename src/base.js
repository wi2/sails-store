import {EventEmitter} from 'events'
import objectAssign from 'object-assign'

export class Base extends EventEmitter {
  constructor(props) {
    super(props);
    this.belongs = props.belongs;
  }
  objectAssign(...col) {
    objectAssign(...col);
  }

}
