import $                 from 'jquery';
import { readFixture }   from '../../../specs_support/utils';
import { transformItem } from './clix';

describe('transformItem', () => {
  let result;
  let data;
  let item = {};
  const state = {
    assessment: {
      items: [{
        json: {
          genusTypeId: 'question-type%3Aqti-upload-interaction-audio%40ODL.MIT.EDU',
          timeValue: {
            hours: 0,
            minutes: 0,
            seconds: 3,
          },
        },
        title: '',
        xml: '',
      },
      {
        json: {
          genusTypeId: 'question-type%3Aqti-order-interaction-mw-sandbox%40ODL.MIT.EDU',
          timeValue: {
            hours: 0,
            minutes: 0,
            seconds: 5,
          },
        },
        title: '',
        xml: '',
      }],
    },
  };


  it('transforms ART question with timeValue into allQuestions state', () => {
    // the clix parser expects xml, pass it in as a file
    data = readFixture('clix/audio-upload.xml');
    item = state.assessment.items[0];
    item.xml = $($.parseXML(data));
    result = transformItem(item);
    expect(result.audioTimeout).toEqual(3);
  });

  it('transforms MW Sandbox question with timeValue into allQuestions state', () => {
    data = readFixture('clix/mw-sandbox.xml');
    item = state.assessment.items[1];
    item.xml = $($.parseXML(data));
    result = transformItem(item);
    expect(result.audioTimeout).toEqual(5);
  });
});
