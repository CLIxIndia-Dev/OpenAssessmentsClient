import React from 'react';

export default function DeleteButton(props) {
  const deleteAssessment = props.deleteAssessment;
  const assessment = props.assessment;
  const onFocus = props.onFocus;
  const isPublished = assessment.isPublished;
  return (
    <button
      className={`au-c-btn au-c-btn--square au-c-btn--table ${isPublished ? 'is-inactive' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        deleteAssessment(assessment.bankId, assessment.id);
      }}
      onFocus={onFocus}
    >
      <i className="material-icons">delete</i>
    </button>
  );
}

DeleteButton.propTypes = {
  deleteAssessment: React.PropTypes.func.isRequired,
  onFocus: React.PropTypes.func.isRequired,
  assessment: React.PropTypes.shape({
    // eslint-disable-next-line react/no-unused-prop-types
    isPublished: React.PropTypes.bool.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    bankId: React.PropTypes.string.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    id: React.PropTypes.string.isRequired,
  }).isRequired,
};
