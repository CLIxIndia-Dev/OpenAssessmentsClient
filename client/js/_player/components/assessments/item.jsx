'use strict';

import React  from "react";
import _                       from 'lodash';
import videojs from 'video.js';
import * as AssessmentActions  from '../../actions/assessment';
import UniversalInput          from './universal_input';


export default class Item extends React.Component {

  static propTypes = {
    // Assessment configuration settings. these should never be modified.
    settings          : React.PropTypes.object,

    // Item to be displayed
    question          : React.PropTypes.object.isRequired,

    // Array of selected answer IDs
    response          : React.PropTypes.array.isRequired,

    // The position of the item in the array of items
    currentItemIndex  : React.PropTypes.number.isRequired,

    // The total number of items in the array of items
    questionCount     : React.PropTypes.number.isRequired,

    // Graded user response object containing keys
    // correct:true/false, feedback:"Answer feedback"
    questionResult    : React.PropTypes.object.isRequired,

    selectAnswer      : React.PropTypes.func.isRequired,

    // User facing strings of the language specified by the 'locale' setting
    localizedStrings  : React.PropTypes.object.isRequired,

    // Actions to call when media events occur
    videoPlay         : React.PropTypes.func.isRequired,
    videoPause        : React.PropTypes.func.isRequired,
    audioPlay         : React.PropTypes.func.isRequired,
    audioPause        : React.PropTypes.func.isRequired,
    audioRecordStart  : React.PropTypes.func.isRequired,
    audioRecordStop   : React.PropTypes.func.isRequired,
  };

  componentDidMount() {

    if (typeof MathJax !== 'undefined') {
      MathJax.Hub.Queue(new Array('Typeset', MathJax.Hub));
    }

    if (!_.isFunction(videojs)) { return; }
    // Look for videos that should be using videojs.
    const videoJSElements = document.querySelectorAll('video.video-js');
    _.each(videoJSElements,(element) => videojs(element));

    const material = document.getElementsByClassName('c-question')[0];
    if (material !== undefined) {
      // loadElements are elements we expect to change the size of the DOM when
      // they load, and that support the 'load' event.
      const loadElements = Array.from(material.querySelectorAll('img, object'));
      loadElements.forEach((e) => {
        e.addEventListener('load', () => this.props.sendSize());
      });

      // mediaElements are elements that could change the size of the DOM, and
      // support media element events like 'loadstart', and 'loadedmetadata'.
      const mediaElements = Array.from(material.querySelectorAll('video, audio'));
      mediaElements.forEach((e) => {
        e.addEventListener('loadstart', () => this.props.sendSize());
        e.addEventListener('loadedmetadata', () => this.props.sendSize());
      });
    }

    const videoElements = document.querySelectorAll('video');
    _.each(videoElements, (element) => {
      element.addEventListener('play', (e) => {
        this.props.videoPlay(e.target.id || e.target.src, e.target.currentTime);
      }, false);

      element.addEventListener('pause', (e) => {
        this.props.videoPause(e.target.id || e.target.src, e.target.currentTime);
      }, false);
    });

    const audioElements = document.querySelectorAll('audio');
    _.each(audioElements, (element) => {
      element.addEventListener('play', (e) => {
        this.props.audioPlay(e.target.id || e.target.src, e.target.currentTime);
      }, false);

      element.addEventListener('pause', (e) => {
        this.props.audioPause(e.target.id || e.target.src, e.target.currentTime);
      }, false);
    });
  }

  getFeedback() {
    const response = this.props.questionResult;
    const questionType = this.props.question.question_type;
    let answerFeedback;

    if (response) {
      if (response.correct === true) {
        switch (questionType) {
          case 'survey_question':
            answerFeedback = (
              <div className="c-question-feedback  c-feedback--correct">
                <div dangerouslySetInnerHTML={{ __html:response.feedback }} />
              </div>
            );
            break; // leaving this uncommented out makes linter complain
          default:
            answerFeedback = (
              <div className="c-question-feedback  c-feedback--correct">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                  <path d="M24 4C12.95 4 4 12.95 4 24c0 11.04 8.95 20 20 20 11.04 0 20-8.96 20-20 0-11.05-8.96-20-20-20zm-4 30L10 24l2.83-2.83L20 28.34l15.17-15.17L38 16 20 34z" />
                </svg>
                <div dangerouslySetInnerHTML={{ __html:response.feedback }} />
              </div>
            );
        }
      } else if (response.correct === false) {
        answerFeedback = (
          <div className="c-question-feedback  c-feedback--incorrect">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
              <path d="M24 4c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm10 27.17l-2.83 2.83-7.17-7.17-7.17 7.17-2.83-2.83 7.17-7.17-7.17-7.17 2.83-2.83 7.17 7.17 7.17-7.17 2.83 2.83-7.17 7.17 7.17 7.17z" />
            </svg>
            <div dangerouslySetInnerHTML={{ __html:response.feedback }} />
          </div>
        );
      }
    }
    return (
      <div>
        {answerFeedback}
      </div>
    );
  }

  // stopKeypress() {
  //   document.onkeydown = (e) => {
  //     if (e.which) {
  //       return false;
  //       console.log('keyboard off');
  //     }
  //     return true;
  //     console.log('keyboard on');
  //   };
  // }

  render() {
    const questRslt = this.props.questionResult;
    let tstResp = null;
    // if (questRslt.answerIds) {
    if (questRslt.answerIds && this.props.question.question_type === 'file_upload_question') {
      tstResp = questRslt.answerIds[0].name;

    } else if (questRslt.answerIds && this.props.question.question_type === 'audio_upload_question') {
      const answerAudioURL = window.URL.createObjectURL(questRslt.answerIds[0]);
      tstResp = answerAudioURL;

    } else {
      tstResp = questRslt.answerIds;
      // this.stopKeypress();
    }
    // } else {
    //   tstResp = this.props.response;
    // }
    let containerStyle = "";
    if(questRslt.answerIds){containerStyle = "c-disable-pointer-n-keys";}

    return (
      <div className="c-question">
        <div className="c-question-prompt">
          <div dangerouslySetInnerHTML={{ __html: this.props.question.material }} />
          <div>answerID is {tstResp}</div>
        </div>
        <div className={`c-answers ${containerStyle}`}>
          <UniversalInput
            settings={this.props.settings}
            item={this.props.question}
            isResult={false}
            selectAnswer={this.props.selectAnswer}
            response={this.props.response}
            localizedStrings={this.props.localizedStrings}
            audioRecordStart={this.props.audioRecordStart}
            audioRecordStop={this.props.audioRecordStop}
          />
        </div>
        {this.getFeedback()}
      </div>
    );
  }
}
