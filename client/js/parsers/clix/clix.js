import _ from 'lodash';

import { transformItem as transformQti2 }  from '../qti2/qti';

export function transformDragAndDrop(question) {
  return {
    question_meta: {
      zones: question.zones,
      targets: question.targets,
    },
    question_type: 'clix_drag_and_drop',
    material: question.text.text,
    isHtml: true,
    answers: question.droppables,
  };
}

export function transformARTtimeout(timeValue) {
  // massage timeValue
  const audioTimeValue = timeValue;
    const { hours, minutes, seconds } = audioTimeValue;
    const audioTimeToSeconds = (hours * 3600) + (minutes * 60) + seconds;
    const defaultAudioTimeout = this.props.settings.audio_recorder_timeout;
  return {
    question_meta: {
      zones: question.zones,
      targets: question.targets,
    },
    question_type: 'clix_drag_and_drop',
    material: question.text.text,
    isHtml: true,
    answers: question.droppables,
  };
}

export function transformItem(item) {
  switch (item.json.genusTypeId) {
    case 'question-type%3Adrag-and-drop%40ODL.MIT.EDU': {
      return transformDragAndDrop(item);
    }

    case ('question-type%3Aqti-order-interaction-mw-sandbox%40ODL.MIT.EDU': 'movable_words_sandbox') ||
      ('question-type%3Aqti-upload-interaction-audio%40ODL.MIT.EDU':'audio_upload_question'): {
        const qti = transformQti2(item.xml);
        let questionType = item.question_type;
        let audioTimeoutObj = item.timeValue;
        let audioTimeoutSeconds = transformARTtimeout
        const mapGenusType = {
          'question-type%3Aqti-order-interaction-mw-sandbox%40ODL.MIT.EDU': 'movable_words_sandbox',
          'question-type%3Aqti-upload-interaction-audio%40ODL.MIT.EDU':'audio_upload_question'
        };

        if (mapGenusType[item.json.genusTypeId]) {
          questionType = mapGenusType[item.json.genusTypeId];
        }

        return _.merge({}, qti, { title: item.title, question_type: questionType });
      }

    default: {
      const qti = transformQti2(item.xml);
      let questionType = item.question_type;
      const mapGenusType = {
        'question-type%3Aqti-order-interaction-mw-sentence%40ODL.MIT.EDU': 'movable_words_sentence',
        'question-type%3Aqti-order-interaction-mw-sandbox%40ODL.MIT.EDU': 'movable_words_sandbox',
        'question-type%3Aqti-order-interaction-object-manipulation%40ODL.MIT.EDU': 'movable_object_chain',
        'question-type%3Aqti-upload-interaction-generic%40ODL.MIT.EDU': 'file_upload_question',
        'question-type%3Aqti-upload-interaction-audio%40ODL.MIT.EDU':'audio_upload_question',
        'question-type%3Aqti-numeric-response%40ODL.MIT.EDU': 'numerical_input_question',
        'question-type%3Aqti-choice-interaction-survey%40ODL.MIT.EDU': 'survey_question'
      };

      if (mapGenusType[item.json.genusTypeId]) {
        questionType = mapGenusType[item.json.genusTypeId];
      }

      return _.merge({}, qti, { title: item.title, question_type: questionType });
    }
  }
}
