import React                from 'react';
import TestUtils            from 'react-addons-test-utils';
import Item                 from './item';
import localizeStrings      from '../../selectors/localize';

describe('item', () => {

  let question = {
    title: 'Test Question Title'
  };
  let questionResult = {};
  let currentItemIndex = 0;
  let assessment = {};
  let questionCount = 10;

  let instance;
  let subject;
  let feedback;

  const renderItem = () => {
    instance = TestUtils.renderIntoDocument(<Item
      response={[]}
      selectAnswer={() => {}}
      videoPlay={() => {}}
      videoPause={() => {}}
      audioPlay={() => {}}
      audioPause={() => {}}
      audioRecordStart={() => {}}
      audioRecordStop={() => {}}
      question={question}
      questionResult={questionResult}
      currentItemIndex={currentItemIndex}
      questionCount={questionCount}
      assessment={assessment}
      localizedStrings={localizeStrings({ settings: { locale: 'en' } })}
    />);
    subject = TestUtils.findRenderedDOMComponentWithClass(instance, 'c-question-prompt');
  };

  // Reset variables to default and render an item
  beforeEach(() => {
    question = {
      title: 'Test Question Title',
      material: 'Test Question Material'
    };
    currentItemIndex = 0;
    assessment = {};
    questionCount = 10;

    renderItem();
  });

  it('renders an item', () => {
    expect(subject.textContent).toContain('Test Question Material');
  });

  describe('feedback', () => {
    it('renders correct when item is correct', () => {
      questionResult = { correct:true, feedback:'Correct answer' };
      renderItem();

      feedback = TestUtils.findRenderedDOMComponentWithClass(instance, 'c-question-feedback');
      expect(feedback.textContent).toContain('Correct');
      expect(feedback.textContent).toContain('Correct answer');
      expect(feedback.textContent).not.toContain('Incorrect');
      expect(feedback.textContent).not.toContain('Incorrect answer');
    });

    it('renders incorrect when item is incorrect', () => {
      questionResult = { correct:false, feedback:'Incorrect answer' };
      renderItem();

      feedback = TestUtils.findRenderedDOMComponentWithClass(instance, 'c-question-feedback');
      expect(feedback.textContent).toContain('Incorrect');
      expect(feedback.textContent).toContain('Incorrect answer');
      expect(feedback.textContent).not.toContain('Correct');
      expect(feedback.textContent).not.toContain('Correct answer');

    });

    it('renders without feedback when item is unchecked', () => {
      questionResult = {};
      renderItem();

      feedback = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'c-question-feedback');
      expect(feedback.length).toEqual(0);
    });
  });

});
