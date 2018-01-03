import React    from 'react';
import localize from '../../locales/localize';

function backButton(props) {
  const strings = props.localizeStrings('backButton');
  return (
    <button
      onClick={() => props.handleClick()}
      className="au-c-btn au-c-btn--sm au-c-btn--outline au-c-btn--back"
    >
      <svg className="svg-24px">
        <use href="/icons/MaterialDesign-svg-sprite-hardware-symbol.svg#ic_keyboard_arrow_left_24px" />
      </svg>
      {strings.back}
    </button>
  );
}


backButton.propTypes = {
  handleClick: React.PropTypes.func.isRequired,
  localizeStrings: React.PropTypes.func.isRequired,
};

export default localize(backButton);
