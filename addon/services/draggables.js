import Ember from 'ember';

// Deprecated service to support saving state of drag/drop for IE 10/11
export default Ember.Service.extend({
  /**
   * track actual dragged data type for IE 10/11
   * that only support `Text`
   */
  currentDraggableDataType: null
});
