# ember-draggable
> HTML5 drag/drop support for ember components

## Features
* HTML5 drag/drop specification
* cross browser support (Chrome, Firefox, Safari, IE 10+)
* shim for `moz-drag-over` CSS psuedoclass

## Installation

```bash
$ ember install ember-draggable
```

## Usage

### Draggable Components
```javascript
import Ember from 'ember';
import Draggable from 'ember-draggable/mixins/draggable';
import Droppable from 'ember-draggable/mixins/droppable';

// example draggable component
export default Ember.Component.extend(Draggable, {
  model: null,
  draggableData: Ember.computed.alias('model.id')
});

// example droppable component
export default Ember.Component.extend(Droppable, {
  model: null,
  actions: {
    drop(modelId) {
      console.log('dropped model id: ', modelId);
    }
  }
});
```

### HTML5 Drop Target

```javascript
import Ember from 'ember';
import Droppable from 'ember-draggable/mixins/droppable';

export default Ember.Component.extend(Droppable, {
  acceptedDropTypes: [
    'text/uri-list'
  ],
  actions: {
    drop(url) {
      console.log('dropped link: ', url);
    }
  }
});
```

## Development

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
