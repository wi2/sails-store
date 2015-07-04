# sails-store
Storage resources with socket.io for sailsjs


## Installation &nbsp; [![NPM version](https://badge.fury.io/js/sails-store.svg)](http://badge.fury.io/js/sails-store) [![Build Status](https://travis-ci.org/wi2/sails-store.png?branch=master)](https://travis-ci.org/wi2/sails-store)


```sh
$ npm install sails-store
```

## Usage
```
var StorSails = require('sails-store');

sItem = StorSails.StoreItem({
  identity: "user",
  id: 2
});

sItem.get()

sItem.on('updated', function(data){
  console.log(data);
});
sItem.modify({})

///


sCollection = StorSails.StoreItem({
  identity: "user"
});

sCollection.get()

sCollection.on('created', function(data){
  console.log(data);
});
sCollection.add({});

sCollection.on('destroyed', function(data){
  console.log(data);
});
sCollection.remove({});


```




## License

MIT &copy; 2015 contributors
