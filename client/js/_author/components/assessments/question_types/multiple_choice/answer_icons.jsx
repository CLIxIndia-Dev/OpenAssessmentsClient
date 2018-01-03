import React    from 'react';

export default function answerIcons(props) {

  let spacer = <button tabIndex="-1" className="au-c-answer__icons__spacer inactive" />;
  if (props.shuffle) {
    spacer = null;
  }
  const upButton = (
    <button
      className="au-c-answer__icons__spacer"
      tabIndex="0"
      onClick={props.moveUp}
    >
      <svg className="svg-24px">
        <use xlinkHref="/icons/MaterialDesign-svg-sprite-navigation-symbol.svg#ic_arrow_upward_24px" />
      </svg>
    </button>
  );
  const downButton = (
    <button
      className="au-c-answer__icons__spacer"
      tabIndex="0"
      onClick={props.moveDown}
    >
      <svg className="svg-24px">
        <use xlinkHref="/icons/MaterialDesign-svg-sprite-navigation-symbol.svg#ic_arrow_downward_24px" />
      </svg>
    </button>
  );

  return (
    <div className="au-c-answer__icons">
      { props.first || props.shuffle ? spacer : upButton }
      { props.last || props.shuffle ? spacer : downButton }
      <button
        className="au-c-answer__icons__spacer"
        tabIndex="0"
        onClick={props.deleteChoice}
      >
        <svg className="svg-24px">
          <use xlinkHref="/icons/MaterialDesign-svg-sprite-navigation-symbol.svg#ic_close_24px" />
        </svg>
      </button>
    </div>
  );
}

answerIcons.propTypes = {
  first: React.PropTypes.bool,
  last: React.PropTypes.bool,
  moveUp: React.PropTypes.func.isRequired,
  moveDown: React.PropTypes.func.isRequired,
  shuffle: React.PropTypes.bool,
  deleteChoice: React.PropTypes.func.isRequired,
};
