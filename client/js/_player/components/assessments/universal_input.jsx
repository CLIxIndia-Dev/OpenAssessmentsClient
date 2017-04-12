import React                          from 'react';
import _                              from 'lodash';
import AudioUpload                    from '../common/audio_upload';
import CheckBox                       from '../common/checkbox';
import DragAndDrop                    from '../common/drag_and_drop';
import FileUpload                     from '../common/file_upload';
import MovableWordsFillTheBlank       from '../common/fill_the_blank/fill_the_blank';
import MappedImage                    from '../common/mapped_image';
import Matching                       from '../common/matching';
import MovableWords                   from '../common/movable_words/movable_words';
import Option                         from '../common/option';
import RadioButton                    from '../common/radio_button';
import SentenceSandbox                from '../common/sentence_sandbox';
import TextField                      from '../common/text_field';
// import TextArea                       from '../common/text_area';

export const CORRECT = 'CORRECT';
export const INCORRECT = 'INCORRECT';
export const UNGRADED = 'UNGRADED';

export default class UniversalInput extends React.Component {

  static propTypes = {
    // Assessment configuration settings. these should never be modified.
    settings: React.PropTypes.object,

    // Item to be displayed
    item: React.PropTypes.object.isRequired,

    selectAnswer: React.PropTypes.func,

    // Whether or not entire question should be disabled
    isResult: React.PropTypes.bool,

    // Array of selected answer IDs
    response: React.PropTypes.array,

    // Graded user response object containing keys
    // correct:true/false, feedback:'Answer feedback'
    questionResult    : React.PropTypes.object.isRequired,

    // User facing strings of the language specified by the 'locale' setting
    localizedStrings: React.PropTypes.object,

    // Actions to trigger when recordings are started or stopped
    audioRecordStart: React.PropTypes.func,
    audioRecordStop: React.PropTypes.func
  };

  wasSelected(id) {
    if (this.props.response) {
      return this.props.response.indexOf(id) > -1;
    }
    return null;
  }

  render() {
    const props = this.props;
    const item = props.item;
    let answerInputs;
    let multipleChoiceAnswer;
    let selectFileUploadAnswer;
    let selectAudioAnswer;
    let selectAnswer;
    let words;
    let audioBlob;
    let multipleAnswer;
    const questRslt = this.props.questionResult;
    const questionType = this.props.item.question_type;
    let containerStyle = '';

    // if answer submitted, show in UI
    // disable specific question type if correct answer submitted,
    // TODO, leverage isDisabled prop instead, and remove cursor: pointer from file_upload
    let answerAudioURL = null;
    let savedResponse = null;

    if (questRslt.correct === true) {
      switch (questionType) {
        case 'file_upload_question':
          savedResponse = questRslt.answerIds[0].name;
          containerStyle = 'c-disable-pointer-n-keys';
          break;
        case 'audio_upload_question':
          answerAudioURL = window.URL.createObjectURL(questRslt.answerIds[0]);
          savedResponse = answerAudioURL;
          break;
        case 'movable_words_sandbox':
          audioBlob = questRslt.answerIds.filter(audBlob => typeof audBlob !== 'string');
          answerAudioURL = window.URL.createObjectURL(audioBlob)[0];
          savedResponse = answerAudioURL;
          break;
        case 'movable_object_chain':
        case 'movable_words_sentence':
        case 'fill_the_blank_question':
          containerStyle = 'c-disable-pointer-n-keys';
          break;
        default:
          savedResponse = questRslt.answerIds;
          containerStyle = 'empty';
      }
    }

    switch (item.question_type) {
      case 'edx_multiple_choice':
      case 'multiple_choice_question':
      case 'true_false_question':
      case 'survey_question':
        multipleChoiceAnswer = (answer) => {
          const selectRadio = _.partialRight(props.selectAnswer, true);
          const id = `${item.id}_${answer.id}`;
          return (
            <RadioButton
              isDisabled={props.isResult}
              key={id}
              id={id}
              item={answer}
              isHtml={item.isHtml}
              name="answer-radio"
              checked={this.wasSelected(answer.id)}
              selectAnswer={selectRadio}
            />
          );
        };
        answerInputs = _.chunk(item.answers, 2).map((row, index) => (
          <ul key={index} className="o-grid">
            {row.map(multipleChoiceAnswer)}
          </ul>
        ));
        break;
      case 'edx_dropdown':
        answerInputs = item.answers.map(answer => (
          <Option
            isDisabled={props.isResult}
            key={`${item.id}_${answer.id}`}
            item={answer}
            name="answer-option"
          />
        ));
        break;
      case 'matching_question':
        answerInputs = (
          <Matching
            isDisabled={props.isResult}
            item={item}
            name="answer-option"
          />
        );
        break;
      case 'edx_numerical_input':
      case 'edx_text_input':
        answerInputs = item.answers.map(answer => (
          <TextField
            isDisabled={props.isResult}
            key={`${item.id}_${answer.id}`}
            item={answer}
            name="answer-text"
          />
        ));
        break;
      case 'text_input_question':
      case 'text_only_question':
      case 'short_answer_question':
        answerInputs = (
          <div className="c-text-answer">
            <textarea
              placeholder="Enter answer here..."
              onBlur={e => props.selectAnswer(e.target.value, true)}
              rows={parseInt(props.item.question_meta.expectedLines, 10) || 1}
              disabled={props.isResult}
              value={savedResponse || undefined}
            />
          </div>
        );
        break;
      case 'numerical_input_question':
        answerInputs = (
          <div className="c-text-answer">
            <textarea
              placeholder="Enter answer here..."
              onBlur={e => props.selectAnswer(e.target.value, true)}
              rows={parseInt(props.item.question_meta.expectedLines, 10) || 1}
              disabled={props.isResult}
              value={savedResponse || undefined}
            />
          </div>
        );
        break;
      case 'multiple_answers_question':
        multipleAnswer = (answer) => {
          const selectCheckbox = _.partialRight(props.selectAnswer, false);
          const id = `${item.id}_${answer.id}`;
          return (
            <CheckBox
              isDisabled={props.isResult}
              key={id}
              id={id}
              item={answer}
              isHtml={item.isHtml}
              checked={this.wasSelected(answer.id)}
              selectAnswer={selectCheckbox}
            />
          );
        };
        answerInputs = _.chunk(item.answers, 2).map((row, index) => (
          <ul key={index} className="o-grid">
            {row.map(multipleAnswer)}
          </ul>
        ));
        break;
      case 'edx_image_mapped_input':
        answerInputs = item.answers.map(answer => (
          <MappedImage
            key={`${item.id}_${answer.id}`}
            item={answer}
          />
        ));
        break;
      case 'edx_drag_and_drop':
        answerInputs = item.answers.map(answer => (
          <DragAndDrop
            key={`${item.id}_${answer.id}`}
            item={answer}
          />
        ));
        break;
      case 'file_upload_question': {
        selectFileUploadAnswer = _.partialRight(props.selectAnswer, true);
        answerInputs = (
          <FileUpload
            localizedStrings={this.props.localizedStrings.fileUpload}
            selectAnswer={selectFileUploadAnswer}
            isDisabled={props.isResult}
            savedResponse={savedResponse || undefined}
          />
        );
        break;
      }
      case 'audio_upload_question': {
        selectAudioAnswer = _.partialRight(props.selectAnswer, true);
        answerInputs = (
          <AudioUpload
            localizedStrings={this.props.localizedStrings.audioUpload}
            selectAnswer={selectAudioAnswer}
            timeout={this.props.settings.audio_recorder_timeout}
            audioRecordStart={this.props.audioRecordStart}
            audioRecordStop={this.props.audioRecordStop}
            isDisabled={props.isResult}
            savedResponse={savedResponse || undefined}
          />
        );
        break;
      }
      case 'drag_and_drop':
        selectAnswer = _.partialRight(props.selectAnswer, false);
        answerInputs = (
          <FillTheBlankDnd
            currentAnswer={this.props.response}
            selectAnswer={selectAnswer}
          />
        );
        break;
      case 'movable_object_chain':
        selectAnswer = _.partialRight(props.selectAnswer, false);
        answerInputs = (
          <MovableWords
            answers={item.answers}
            selectAnswer={selectAnswer}
            wordChain={props.response}
            itemClassName="c-object"
            answerBoxClassName="c-object-answers"
            noStartBlock={true}
            isDisabled={props.isResult}
          />
        );
        break;
      case 'movable_words_sentence':
        selectAnswer = _.partialRight(props.selectAnswer, false);
        answerInputs = (
          <MovableWords
            answers={item.answers}
            selectAnswer={selectAnswer}
            wordChain={props.response}
            itemClassName="c-word"
            answerBoxClassName="c-word-answers"
            isDisabled={props.isResult}
          />
        );
        break;
      case 'movable_words_sandbox':
        selectAnswer = _.partialRight(props.selectAnswer, false);
        // Movable words sandbox stores both audio files, and word id's in global
        // state. Grab only the word id's for the word chain.
        words = props.response.filter((word) => typeof word === 'string');
        audioBlob = props.response.filter((audBlob) => typeof audBlob !== 'string')[0];
        if (words) {
          console.log(`word is ${words}`);
        }

        if (audioBlob) {
          answerAudioURL = window.URL.createObjectURL(audioBlob);
          console.log(`audio blob is ${answerAudioURL}`);
        }
        // if (questRslt.correct === true) {
        //   audioBlob = props.response.filter((item) => typeof item === 'Blob');
        //   console.log(`audio blob is ${audioBlob}`);
        // // answerAudioURL = window.URL.createObjectURL(questRslt.answerIds[0]);
        //   answerAudioURL = window.URL.createObjectURL(audioBlob);
        //   // console.log(`audio blob is ${audioBlob}`);
        // }
        // savedResponse = answerAudioURL;
        answerInputs = (
          <SentenceSandbox
            answers={item.answers}
            selectAnswer={selectAnswer}
            wordChain={words}
            localizedStrings={this.props.localizedStrings.audioUpload}
            timeout={this.props.settings.audio_recorder_timeout}
            itemClassName="c-word"
            answerBoxClassName="c-word-answers"
            audioRecordStart={this.props.audioRecordStart}
            audioRecordStop={this.props.audioRecordStop}
            savedResponse={savedResponse || undefined}
          />
        );
        break;
      case 'fill_the_blank_question':
        selectAnswer = _.partialRight(props.selectAnswer, false);
        answerInputs = (
          <MovableWordsFillTheBlank
            answers={item.answers}
            sentenceWithBlank={item.question_meta.fillTheBlankSentence}
            selectAnswer={selectAnswer}
            selectedAnswer={props.response}
            isDisabled={props.isResult}
          />
        );
        break;
      default:
        answerInputs = undefined;

    }

    return (
      <div className={containerStyle}>
        {answerInputs}
      </div>
    );
  }
}
