import React      from 'react';
import localize   from '../../../../locales/localize';

function addOption(props) {
  const strings = props.localizeStrings('addOption');
  const uniqId = `add-option-${props.itemId}`
  return (
    <div
      className="au-c-answer au-o-flex-center au-c-answer--add"
      tabIndex="0"
      onClick={() => props.updateChoice()}
    >
      <div className="au-c-input">
        <label htmlFor={uniqId} />
        <div className="au-c-input__contain">
          <input
            className="au-c-text-input au-c-text-input--small au-c-wysiwyg au-c-option"
            id={uniqId}
            type="text"
            defaultValue={strings.addOption}
          />
          <div className="au-c-input__bottom no-border" />
        </div>
      </div>
    </div>
  );
}

addOption.propTypes = {
  updateChoice: React.PropTypes.func.isRequired,
  localizeStrings: React.PropTypes.func.isRequired,
  itemId: React.PropTypes.string.isRequired,
  numChoices: React.PropTypes.number.isRequired
};

export default localize(addOption);
