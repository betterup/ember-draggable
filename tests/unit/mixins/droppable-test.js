import Ember from 'ember';
import DroppableMixin from '../../../mixins/droppable';
import { module, test } from 'qunit';

module('Unit | Mixin | droppable');

// Replace this with your real tests.
test('it works', function(assert) {
  var DroppableObject = Ember.Object.extend(DroppableMixin);
  var subject = DroppableObject.create();
  assert.ok(subject);
});
