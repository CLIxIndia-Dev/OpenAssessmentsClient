import React      from 'react';
import TestUtils  from 'react-addons-test-utils';
import NewItem    from './new_item_form';

describe('New Item Form', () => {
  let result;
  let props;
  let called;

  beforeEach(() => {
    called = null;
    props = {
      cancel: () => { called = 'cancel'; },
      create: (state) => { called = state; },
    };

    result = TestUtils.renderIntoDocument(<NewItem {...props} />);
  });

  it('calls cancel when cancelled', () => {
    const button = TestUtils.findRenderedDOMComponentWithClass(result, 'c-btn--gray');
    TestUtils.Simulate.click(button);
    expect(called).toBe('cancel');
  });

  it('sets default settings on new assessments', () => {
    const button = TestUtils.findRenderedDOMComponentWithClass(result, 'c-btn--maroon');
    TestUtils.Simulate.click(button);
    expect(called.genusTypeId).toBeDefined();
    expect(called.genusTypeId).toBe('item-genus-type%3Aqti-choice-interaction%40ODL.MIT.EDU');
    expect(called.name).toBe('');
    expect(called.language).toBe('english');
  });

  it('sets name on new assessments', () => {
    const input = TestUtils.findRenderedDOMComponentWithClass(result, 'c-text-input');
    const button = TestUtils.findRenderedDOMComponentWithClass(result, 'c-btn--maroon');
    TestUtils.Simulate.change(input, { target: { value: 'tacos' } });
    TestUtils.Simulate.click(button);
    expect(called.name).toBe('tacos');
  });

  it('sets type on new assessments', () => {
    const input = TestUtils.scryRenderedDOMComponentsWithTag(result, 'select')[0];
    const button = TestUtils.findRenderedDOMComponentWithClass(result, 'c-btn--maroon');
    TestUtils.Simulate.change(input, { target: { value: 'item-genus-type%3Aqti-choice-interaction%40ODL.MIT.EDU' } });
    TestUtils.Simulate.click(button);
    expect(called.genusTypeId).toBe('item-genus-type%3Aqti-choice-interaction%40ODL.MIT.EDU');
  });

  it('sets language on new assessments', () => {
    const input = TestUtils.scryRenderedDOMComponentsWithTag(result, 'select')[1];
    const button = TestUtils.findRenderedDOMComponentWithClass(result, 'c-btn--maroon');
    TestUtils.Simulate.change(input, { target: { value: 'french' } });
    TestUtils.Simulate.click(button);
    expect(called.language).toBe('french');
  });

});
