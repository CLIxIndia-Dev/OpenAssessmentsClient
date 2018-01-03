import React      from 'react';

export default function bankIcon(props) {
  switch (props.type) {
    case 'Bank':
    case 'OsidNode':
      return <i className="material-icons">folder</i>;
    case 'Assessment':
      return <i className="material-icons">description</i>;
    case 'Publish':
      return (
        <svg className="svg-24px">
          <use xlinkHref="/icons/MaterialDesign-svg-sprite-file-symbol.svg#ic_cloud_upload_24px" />
        </svg>
      );
    case 'Published':
      return (
        <svg className="svg-24px">
          <use xlinkHref="/icons/MaterialDesign-svg-sprite-file-symbol.svg#ic_cloud_done_24px" />
        </svg>
      );
    default:
      // console.log(props.type);
      return null;
  }
}

bankIcon.propTypes = {
  type: React.PropTypes.string,
};
