import React from 'react';

export default function PreviewButton(props) {
  const isPublished = props.assessment.isPublished;
  return (
    <button
      aria-label="Preview assessment"
      className={`au-c-btn au-c-btn--square au-c-btn--table ${isPublished ? '' : 'is-inactive'}`}
      disabled={!isPublished}
      onClick={(e) => {
        e.stopPropagation();
        window.open(`${window.location.href}banks/${props.assessment.bankId}/assessments/${props.assessment.id}/preview`);
      }}
      onFocus={props.onFocus}
    >
      <svg className="svg-24px">
        <use xlinkHref="/icons/MaterialDesign-svg-sprite-image-symbol.svg#ic_remove_red_eye_24px" />
      </svg>
    </button>
  );
}

PreviewButton.propTypes = {
  assessment: React.PropTypes.shape({
    isPublished: React.PropTypes.bool.isRequired,
    bankId: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
  }).isRequired,
  onFocus: React.PropTypes.func.isRequired
};
