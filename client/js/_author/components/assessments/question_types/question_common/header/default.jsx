import React     from 'react';
import DotLoader from '../../../../common/dot_loader';
import types     from '../../../../../../constants/question_types';
import HelpLink  from '../../../help_link';

export default function DefaultHeader(props) {
  if (props.isRemoving) { return <DotLoader />; }

  let helpLinkPath = '/help.html';
  switch (props.type) {
    case types.audioUpload:
      helpLinkPath += '#user-content-audio-record';
      break;

    case types.fileUpload:
      helpLinkPath += '#user-content-file-upload';
      break;

    case types.movableWordSandbox:
      helpLinkPath += '#user-content-movable-word----sandbox';
      break;

    case types.movableWordSentence:
      helpLinkPath += '#user-content-movable-word----sentence';
      break;

    case types.movableFillBlank:
      helpLinkPath += '#user-content-movable-word----fill-in-the-blank';
      break;

    case types.shortAnswer:
      helpLinkPath += '#user-content-short-answer';
      break;

    case types.imageSequence:
      helpLinkPath += '#user-content-image-sequence';
      break;

    case types.multipleChoice:
      helpLinkPath += '#user-content-multiple-choice';
      break;

    case types.reflection:
      helpLinkPath += '#user-content-multiple-choice----reflection';
      break;

    case types.multipleAnswer:
      helpLinkPath += '#user-content-multiple-choice----multiple-select';
      break;

    case types.multipleReflection:
      helpLinkPath += '#user-content-multiple-choice----multiple-select--reflection';
      break;

    case types.dragAndDrop:
      helpLinkPath += '#user-content-drag-and-drop';
      break;

    default:
      break;
  }

  return (
    <div className="au-o-right au-c-question-icons">
      <button
        aria-label="Preview question"
        className="au-c-btn au-c-btn--square"
        onClick={props.togglePreview}
      >
        <svg className="svg-24px">
          <use href="/icons/MaterialDesign-svg-sprite-image-symbol.svg#ic_remove_red_eye_24px" />
        </svg>
      </button>
      <button
        aria-label="Change question order"
        className="au-c-btn au-c-btn--square"
        onClick={props.toggleReorder}
      >
        <svg className="svg-24px">
          <use href="/icons/MaterialDesign-svg-sprite-action-symbol.svg#ic_swap_vert_24px" />
        </svg>
      </button>
      <button
        aria-label="Delete question"
        className="au-c-btn au-c-btn--square"
        onClick={() => props.deleteAssessmentItem(props.id)}
      >
        <svg className="svg-24px">
          <use href="/icons/MaterialDesign-svg-sprite-action-symbol.svg#ic_delete_24px" />
        </svg>
      </button>
      <HelpLink
        to={helpLinkPath}
        icon
      />
    </div>
  );
}

DefaultHeader.propTypes = {
  id: React.PropTypes.string,
  deleteAssessmentItem: React.PropTypes.func,
  toggleReorder: React.PropTypes.func,
  isRemoving: React.PropTypes.bool,
  togglePreview: React.PropTypes.func,
  type: React.PropTypes.string,
};
