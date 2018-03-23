import React from 'react';

export default function PublishButton(props) {
  const { togglePublishAssessment, assessment } = props;
  const isPublished = assessment.isPublished;
  const icon = isPublished ?
    (
      <i
        aria-label="Unpublish assessment"
        className="material-icons is-published"
        title="Click to unpublish assessment"
      >
        cloud_done
      </i>
    ) :
    (
      <i
        aria-label="Publish assessment"
        className="material-icons"
        title="Click to publish assessment"
      >
        cloud_upload
      </i>
    );
  const titleText = isPublished ?
    'Click to unpublish assessment' :
    'Click to publish assessment';
  if (!assessment.isToggling) {
    return (
      <button
        className={`au-c-btn au-c-btn--square au-c-publish ${isPublished ? 'is-published' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          togglePublishAssessment(assessment);
        }}
        onFocus={props.onFocus}
        title={titleText}
      >
        { icon }
      </button>
    );
  }

  return (
    <button
      className={`au-c-btn au-c-btn--square au-c-publish ${isPublished ? 'is-published' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
      }}
      onFocus={props.onFocus}
    >
      { icon }
    </button>
  );

}

PublishButton.propTypes = {
  togglePublishAssessment: React.PropTypes.func.isRequired,
  onFocus: React.PropTypes.func.isRequired,
  assessment: React.PropTypes.shape({}).isRequired,
};
