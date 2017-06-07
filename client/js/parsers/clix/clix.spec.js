// import _ from 'lodash';

// import { transformItem as transformQti2 }  from '../qti2/qti';

// import * as ClixSelectors                   from './selectors';

import { transformItem } from './clix';


// let item = {
//   answers: [],
//   audioTimeout: 3,
//   isHtml: true,
//   material: '<p>record up to 3 secs</p>',
//   question_meta: { responseIdentifier: 'RESPONSE_1' },
//   question_type: 'audio_upload_question',
//   title: '',
// };

describe('transformItem', () => {
  let result;
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
        xml: '<?xml version="1.0" encoding="utf-8"?><assessmentItem adaptive="False" identifier="assessment.Item%3A59382ed2c89cd95ade2ba0d0%40assessment-session" timeDependent="False" title="" xml_ns="http://www.imsglobal.org/xsd/imsqti_v2p1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqti_v2p1 http://www.imsglobal.org/xsd/qti/qtiv2p1/imsqti_v2p1p1.xsd http://www.w3.org/1998/Math/MathML http://www.w3.org/Math/XMLSchema/mathml2/mathml2.xsd"><outcomeDeclaration baseType="float" cardinality="single" identifier="SCORE"><defaultValue><value> 0 </value> </defaultValue> </outcomeDeclaration><outcomeDeclaration baseType="float" cardinality="single" identifier="MAXSCORE"><defaultValue><value> 1 </value> </defaultValue> </outcomeDeclaration><outcomeDeclaration baseType="float" cardinality="single" identifier="MINSCORE" view="testConstructor"><defaultValue><value> 0 </value> </defaultValue> </outcomeDeclaration><itemBody><p> record up to 3 secs </p><uploadInteraction responseIdentifier="RESPONSE_1"/> </itemBody></assessmentItem>',
      }],
    },
  };

  // const item = {
  //   json: {
  //     genusTypeId: 'question-type%3Aqti-upload-interaction-audio%40ODL.MIT.EDU',
  //     timeValue: {
  //       hours: 0,
  //       minutes: 0,
  //       seconds: 3,
  //     },
  //   },
  //   xml: '<?xml version="1.0" encoding="utf-8"?><assessmentItem adaptive="False" identifier="assessment.Item%3A59382ed2c89cd95ade2ba0d0%40assessment-session" timeDependent="False" title="" xml_ns="http://www.imsglobal.org/xsd/imsqti_v2p1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqti_v2p1 http://www.imsglobal.org/xsd/qti/qtiv2p1/imsqti_v2p1p1.xsd http://www.w3.org/1998/Math/MathML http://www.w3.org/Math/XMLSchema/mathml2/mathml2.xsd"><outcomeDeclaration baseType="float" cardinality="single" identifier="SCORE"><defaultValue><value> 0 </value> </defaultValue> </outcomeDeclaration><outcomeDeclaration baseType="float" cardinality="single" identifier="MAXSCORE"><defaultValue><value> 1 </value> </defaultValue> </outcomeDeclaration><outcomeDeclaration baseType="float" cardinality="single" identifier="MINSCORE" view="testConstructor"><defaultValue><value> 0 </value> </defaultValue> </outcomeDeclaration><itemBody><p> record up to 3 secs </p><uploadInteraction responseIdentifier="RESPONSE_1"/> </itemBody></assessmentItem>',
  // };

  it('transforms ART question with timeValue into allQuestions state', () => {
    // state.allQuestions = {
    //   [{
    //   answers: [],
    //   audioTimeout: 3,
    //   isHtml: true,
    //   material: '<p>record up to 3 secs</p>',
    //   question_meta: { responseIdentifier: 'RESPONSE_1' },
    //   question_type: 'audio_upload_question',
    //   title: '',
    // },
    // {
    //   answers: [{}, {}, {}, {}],
    //   audioTimeout: 5,
    //   isHtml: true,
    //   material: '<p>record up to 5 secs</p>',
    //   question_meta: {
    //     responseIdentifier: 'RESPONSE_1',
    //     shuffle: 'true',
    //   },
    //   question_type: 'movable_words_sandbox',
    //   title: '',
    // }]
    // };
    const item = state.assessment.items[0];
    const genusTypeId = 'question-type%3Aqti-upload-interaction-audio%40ODL.MIT.EDU';
    // console.log(JSON.stringify(item.xml, null, 2));
    result = transformItem(item);
    console.log(JSON.stringify(item.xml, null, 2));
    // console.log(JSON.stringify(item.genusTypeId, null, 2));
    expect(result.allQuestions).toEqual([{
      answers: [],
      audioTimeout: 3,
      isHtml: true,
      material: '<p>record up to 3 secs</p>',
      question_meta: { responseIdentifier: 'RESPONSE_1' },
      question_type: 'audio_upload_question',
      title: '',
    }]);
  });

  // describe('transformARTtimeout', () => {
  //   it('shows previous button when unlock_prev ALWAYS and isNofM', () => {
  //     state.settings.unlock_prev = 'ALWAYS';
  //     state.assessment.requireNAnswers = 3;
  //     state.assessmentProgress = Immutable.fromJS({ currentItemIndex: 1 });
  //     result = ClixSelectors.secondaryActionState(state);
  //     expect(result).toEqual({ buttonState: SECONDARY_ACTION.PREV });
  //   });
  // });
});
