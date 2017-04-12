import React        from 'react';
import TestUtils    from 'react-addons-test-utils';
import Draggable    from './draggable';

describe('Draggable Object', () => {
  let instance;
  let item;
  let zone;
  let object;

  beforeEach(() => {
    item = {
      id: 0,
      label: 'A Label'
    };
    instance = TestUtils.renderIntoDocument(<Draggable
      item={item}
    />);
    zone = TestUtils.findRenderedDOMComponentWithClass(instance, 'dropZone');
    object = TestUtils.findRenderedDOMComponentWithClass(instance, 'draggable');
  });

  it('Renders', () => {
    expect(instance).toBeDefined();
    expect(object.textContent).toContain('A Label');
    expect(zone).toBeDefined();
  });
  it('Is draggable', () => {
    expect(object.attributes.draggable).toBeTruthy();
    spyOn(instance, 'drag');
    TestUtils.Simulate.dragStart(object);
    expect(instance.drag).toHaveBeenCalled();
  });
  it('Is droppable', () => {
    spyOn(instance, 'drop');
    TestUtils.Simulate.drop(zone);
    expect(instance.drop).toHaveBeenCalled();
  });
  it('Has drag over', () => {
    expect(object).toBeDefined();
  });
});
