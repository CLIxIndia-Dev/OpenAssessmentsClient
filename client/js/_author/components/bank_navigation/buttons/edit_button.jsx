import React from 'react';

export default function EditButton(props) {
  const isPublished = props.assessment.isPublished;
  return (
    <button
      aria-label="Edit assessment"
      className={`au-c-btn au-c-btn--square au-c-btn--table ${isPublished ? 'is-inactive' : ''}`}
      disabled={isPublished}
      onFocus={props.onFocus}
      onClick={props.selectItem}
    >
      <svg className="svg-24px">
        <use href="/icons/MaterialDesign-svg-sprite-image-symbol.svg#ic_edit_24px" />
      </svg>
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
