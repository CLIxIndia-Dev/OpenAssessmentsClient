import React                from 'react';
import TestUtils            from 'react-addons-test-utils';
import wrapInDndContext     from '../../../../../specs_support/dnd_wrapper';
import { MovableWords, __RewireAPI__ as RewireAPI }     from './movable_words';

describe('movable words', () => {
  let instance;

  beforeEach(() => {
    const props = {
      wordChain: [1],
      answers: [{
        id: 1,
        material: 'asdf'
      }],
      selectAnswer: () => {}
    };

    const WrappedComponent = wrapInDndContext(MovableWords);
    RewireAPI.__Rewire__('ItemChain', () => (<div className="c-drop-zone">WordChain</div>));
    instance = TestUtils.renderIntoDocument(<WrappedComponent {...props} />);
  });

  it('renders the word chain', () => {
    const wordChain = TestUtils.findRenderedDOMComponentWithClass(instance, 'c-drop-zone');
    expect(wordChain.textContent).toContain('WordChain');
  });

  it('renders the word cloud', () => {
    const wordCloud = TestUtils.findRenderedDOMComponentWithClass(instance, 'c-word-box');
    expect(wordCloud.textContent).toContain('asdf');
  });
});
