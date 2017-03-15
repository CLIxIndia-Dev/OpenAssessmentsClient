import React                from 'react';
import ReactDOM             from 'react-dom';
import TestUtils            from 'react-addons-test-utils';
import Item                 from './item';
import localizeStrings      from '../../selectors/localize';

describe('item', function() {

  let question = {
    title:'Test Question Title'
  };
  let questionResult = {};
  let currentItemIndex = 0;
  let assessment = {};
  let questionCount = 10;

  let result;
  let subject;

  const renderItem = () => {
    result = TestUtils.renderIntoDocument(<Item
      question={question}
      questionResult={questionResult}
      currentItemIndex={currentItemIndex}
      questionCount={questionCount}
      assessment={assessment}
      localizedStrings={localizeStrings({ settings: { locale:'en' } })}
    />);
    subject = ReactDOM.findDOMNode(result);
  };

  // Reset variables to default and render an item
  beforeEach(() => {
    question = {
      title:'Test Question Title',
      material:'Test Question Material',
      question_type: 'multiple_choice_question'
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
    it('renders correct when item is correct, yet not survey_question', () => {
      questionResult = { correct:true, feedback:'Correct answer' };
      renderItem();

      expect(question.question_type).toContain('multiple_choice_question');
      expect(subject.textContent).toContain('Correct');
      expect(subject.textContent).toContain('Correct answer');
      expect(subject.textContent).not.toContain('Incorrect');
      expect(subject.textContent).not.toContain('Incorrect answer');
    });

    it('renders correct when item is correct, and is survey_question', () => {
      question = {
        title: 'Test Question Title',
        material: 'Test Question Material',
        question_type: 'survey_question'
      };
      questionResult = { correct:true, feedback:'Correct answer' };
      renderItem();

      expect(question.question_type).toContain('survey_question');
      expect(subject.textContent).toContain('Correct');
      expect(subject.textContent).toContain('Correct answer');
      expect(subject.textContent).not.toContain('Incorrect');
      expect(subject.textContent).not.toContain('Incorrect answer');
    });

    it('renders incorrect when item is incorrect', () => {
      questionResult = { correct:false, feedback:'Incorrect answer' };
      renderItem();

      expect(subject.textContent).toContain('Incorrect');
      expect(subject.textContent).toContain('Incorrect answer');
      expect(subject.textContent).not.toContain('Correct');
      expect(subject.textContent).not.toContain('Correct answer');

    });

    it('renders without feedback when item is unchecked', () => {
      questionResult = {};
      renderItem();

      expect(subject.textContent).not.toContain('Incorrect');
      expect(subject.textContent).not.toContain('incorrect answer');
      expect(subject.textContent).not.toContain('Correct');
      expect(subject.textContent).not.toContain('Correct answer');
    });
  });

});
