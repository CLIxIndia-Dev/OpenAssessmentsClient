import $                                       from 'jquery';
import Qti1Parser                              from './parser';
import { readFixture }                         from '../../../specs_support/utils';
import { getItems, checkAnswer }               from './qti';

describe('QTI 1 Functions', () => {

  describe('GetItems', () => {
    it('retrieves all items from assessment.xml', () => {
      const data          = readFixture('qti1/assessment.xml');
      const xml           = $(data);
      const assessmentXml = xml.find('assessment').addBack('assessment');
      const assessment = Qti1Parser.parse(1, assessmentXml, xml);
      const items = getItems(assessment.sections, null);
      expect(items.length).toEqual(10);
    });

    it('retrieves 5 items from assessment.xml', () => {
      const data          = readFixture('qti1/assessment.xml');
      const xml           = $(data);
      const assessmentXml = xml.find('assessment').addBack('assessment');
      const assessment = Qti1Parser.parse(1, assessmentXml, xml);
      const items = getItems(assessment.sections, 5);
      expect(items.length).toEqual(5);
    });

    it('retrieves all items from dna.xml', () => {
      const data          = readFixture('qti1/dna.xml');
      const xml           = $(data);
      const assessmentXml = xml.find('assessment').addBack('assessment');
      const assessment = Qti1Parser.parse(1, assessmentXml, xml);
      const items = getItems(assessment.sections, null);
      expect(items.length).toEqual(9);
    });

    it('retrieves 2 items from each section dna.xml', () => {
      const data          = readFixture('qti1/dna.xml');
      const xml           = $(data);
      const assessmentXml = xml.find('assessment').addBack('assessment');
      const assessment = Qti1Parser.parse(1, assessmentXml, xml);
      const items = getItems(assessment.sections, 2);
      expect(items.length).toEqual(4);
    });
  });

  describe('loadOutcomes', () => {
    it('should load outcomes from the QTI file');
  });

  describe('CheckAnswer Multiple choice', () => {
    let item;
    let selectedAnswer;
    beforeEach(() => {
      selectedAnswer = '1000';
      item = {
        id: '0',
        question_type: 'multiple_choice_question',
        correct: [{ id: '1000', score: '100' }]
      };
    });
    it('returns true if the selected answer is correct', () => {
      const result = checkAnswer(item, selectedAnswer);
      expect(result.correct).toEqual(true);
      expect(result.score).toEqual('100');
    });

    it('returns false if the selected answer is wrong', () => {
      selectedAnswer = '4000';
      const result = checkAnswer(item, selectedAnswer);
      expect(result.correct).toEqual(false);
      expect(result.score).toEqual('0');
    });
  });

  describe('CheckAnswer Multiple Answer', () => {
    let item;
    let selectedAnswer;
    beforeEach(() => {
      selectedAnswer = ['1000', '2000'];
      item = {
        id: '0',
        question_type: 'multiple_answers_question',
        correct: [{ id: ['1000', '2000'], score: '100' }]
      };
    });
    it('returns true if the selected answer is correct', () => {
      const result = checkAnswer(item, selectedAnswer);
      expect(result.correct).toEqual(true);
      expect(result.score).toEqual('100');
    });

    it('returns false if the one selected answer is wrong', () => {
      selectedAnswer[0] = '4000';
      const result = checkAnswer(item, selectedAnswer);
      expect(result.correct).toEqual(false);
      expect(result.score).toEqual('0');
    });

    it('returns false if the two selected answers are wrong', () => {
      selectedAnswer[0] = '4000';
      selectedAnswer[1] = '3000';
      const result = checkAnswer(item, selectedAnswer);
      expect(result.correct).toEqual(false);
      expect(result.score).toEqual('0');
    });
  });

  describe('CheckAnswer Matching', () => {
    let item;
    let selectedAnswer;
    beforeEach(() => {
      selectedAnswer = [{
        id: 'match this',
        answerNumber: 'answer-0',
        selectedAnswer: 'i am a match'
      }, {
        id: 'match this',
        answerNumber: 'answer-1',
        selectedAnswer: 'i am a match also'
      }];
      item = {
        id: '0',
        answers: [{
          id: '1000',
          material: 'i am a match'
        }, {
          id: '2000',
          material: 'i am a match also'
        }],
        question_type: 'matching_question',
        correct: [{
          id: '1000',
          score: '50'
        }, {
          id: '2000',
          score: '50'
        }]
      };
    });
    it('returns true if the selected answer is correct', () => {
      const result = checkAnswer(item, selectedAnswer);
      expect(result.correct).toEqual(true);
      expect(result.score).toEqual('100');
    });

    it('returns false if the one selected answer is wrong', () => {
      selectedAnswer[0].selectedAnswer = 'i am a match also';
      const result = checkAnswer(item, selectedAnswer);
      expect(result.correct).toEqual(false);
      expect(result.score).toEqual('0');
    });

    it('returns false if the two selected answers are wrong', () => {
      selectedAnswer[0].selectedAnswer = 'i am a match also';
      selectedAnswer[1].selectedAnswer = 'i am a match';
      const result = checkAnswer(item, selectedAnswer);
      expect(result.correct).toEqual(false);
      expect(result.score).toEqual('0');
    });
  });

});
