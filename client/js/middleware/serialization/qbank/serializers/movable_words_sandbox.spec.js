import movableWordsSerializer from './movable_words_sandbox';
import genusTypes             from '../../../../constants/genus_types';
import languages              from '../../../../constants/language_types';
import { languageText }       from '../../serializer_utils';

describe('MovableWordsSandbox', () => {

  let item;
  let originalItem;

  beforeEach(() => {
    originalItem = {
      question: {
        correctFeedback: { answerId: '1' }
      },
    };

    item = {
      question: {
        choices: [{
          id: 'id14a6824a-79f2-4c00-ac6a-b41cbb64db45',
          text: 'the bus',
          wordType: 'noun',
        },
        {
          id: 'id969e920d-6d22-4d06-b4ac-40a821e350c6',
          text: 'the airport',
          wordType: 'noun',
        }],
        correctFeedback: {
          text: 'correctText',
          fileIds: {},
          id: '1',
        },
      },
      language: languages.languageTypeId.english,
    };
  });

  it('should serialize choices', () => {
    const expectedChoices = [{
      id: 'id14a6824a-79f2-4c00-ac6a-b41cbb64db45',
      text: '<p class=\'noun\'>the bus</p>'
    }, {
      id: 'id969e920d-6d22-4d06-b4ac-40a821e350c6',
      text: '<p class=\'noun\'>the airport</p>'
    }];

    const result = movableWordsSerializer(originalItem, item);
    expect(result.question.choices).toEqual(expectedChoices);
  });

  it('should serialize answers', () => {
    const expectedAnswers = [{
      genusTypeId: genusTypes.answer.rightAnswer,
      feedback: languageText(item.question.correctFeedback.text, item.language),
      id: item.question.correctFeedback.id,
      fileIds: {}
    }];

    const result = movableWordsSerializer(originalItem, item);
    expect(result.answers).toEqual(expectedAnswers);
  });
});
