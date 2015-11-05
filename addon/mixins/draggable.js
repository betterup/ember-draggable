import Ember from 'ember';
const { Logger } = Ember;

// mixin for draggable components
// adds `dragging` CSS class while component is being dragged
export default Ember.Mixin.create({
  attributeBindings: ['draggable'],
  classNameBindings: ['isDragging:dragging'],
  draggable: true,
  dragEffect: 'move',
  draggableDataType: 'application/draggable',
  /**
   * IE 10/11 fallback
   */
  draggableDataTypeFallback: 'Text',
  draggables: Ember.inject.service(),
  draggableData: Ember.computed.alias('elementId'),
  _startDrag: function(event) {
    this.set('isDragging', true);
    let { dataTransfer } = event;
    dataTransfer.effectAllowed = this.get('dragEffect');
    let type = this.get('draggableDataType');
    let data = this.get('draggableData');
    try {
      dataTransfer.setData(type, data);
    } catch(e) {
      Logger.warn('Using fallback mode for drag/drop content type:', type);
      this.get('draggables').set('currentDraggableDataType', type);
      dataTransfer.setData(this.get('draggableDataTypeFallback'), data);
    }
  }.on('dragStart'),
  _endDrag: function() {
    this.set('isDragging', false);
    this.get('draggables').set('currentDraggableDataType', null);
  }.on('dragEnd')
});
