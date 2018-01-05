import React from 'react';

export default function EditButton(props) {
  const isPublished = props.assessment.isPublished;
  return (
    <button
      className={`au-c-btn au-c-btn--square au-c-btn--table ${isPublished ? 'is-inactive' : ''}`}
      disabled={isPublished}
      onFocus={props.onFocus}
      onClick={props.selectItem}
    >
      <i
        aria-label="Edit assessment"
        className="material-icons"
      >
        edit
      </i>
    </button>
  );
}

EditButton.propTypes = {
  assessment: React.PropTypes.shape({
    isPublished: React.PropTypes.bool.isRequired,
  }).isRequired,
  onFocus: React.PropTypes.func.isRequired,
  selectItem: React.PropTypes.func.isRequired
};
