import Ember from 'ember';

// mixin for droppable components
// adds `drag-over` CSS class when element is pending drop
// which mirrors moz-drag-over psuedoclass
export default Ember.Mixin.create({
  classNameBindings: ['hasDragOver:drag-over'],
  acceptedDropTypes: [
    'application/draggable'
  ],
  dropEffect: 'move',
  draggables: Ember.inject.service(),
  _isValidDrop(event) {
    return this._preferredDropType(event);
  },
  _preferredDropType(event) {
    let { dataTransfer } = event;
    let fallbackTransferType = this.get('draggables.currentDraggableDataType');
    if (fallbackTransferType && this.get('acceptedDropTypes').contains(fallbackTransferType)) {
      return fallbackTransferType;
    }
    return this.get('acceptedDropTypes').find((type) => {
      return dataTransfer.types.contains(type);
    });
  },
  _dropData(event) {
    let { dataTransfer } = event;
    let fallbackTransferType = this.get('draggables.currentDraggableDataType');
    if (fallbackTransferType) {
      return dataTransfer.getData('Text');
    } else {
      let type = this._preferredDropType(event);
      return dataTransfer.getData(type);
    }
  },
  _handleDragOver: function(event) {
    if (this._isValidDrop(event)) {
      event.preventDefault();
      event.dataTransfer.dropEffect = this.get('dropEffect');
      this.set('hasDragOver', true);
    }
  }.on('dragOver'),
  _resetDroppability: function() {
    this.set('hasDragOver', false);
  }.on('dragLeave'),
  _handleDrop: function(event) {
    this._resetDroppability();
    if (this._isValidDrop(event)) {
      let data = this._dropData(event);
      this.send('drop', data);
    }
  }.on('drop')
});
