import React from 'react';

export default function ListItem(props) {
  const {
    selectItem, bank, onFocus, ariaLabel, isClickable
  } = props;

  if (isClickable) {
    return (
      <tr
        onClick={() => selectItem()}
        onKeyDown={(e) => { if (e.keyCode === 13) { selectItem(); } }}
        tabIndex="0"
        role="button"
        aria-label={ariaLabel || bank.displayName.text}
        onFocus={() => onFocus(true)}
        onMouseEnter={() => onFocus(true)}
        onMouseLeave={() => onFocus(false)}
        className={props.focused ? 'focused' : ''}
      >
        {
         props.children
        }
      </tr>
    );
  }

  return (
    <tr
      role="navigation"
      tabIndex="0"
      aria-label={ariaLabel || bank.displayName.text}
    >
      {
       props.children
      }
    </tr>
  );
}

ListItem.propTypes = {
  selectItem: React.PropTypes.func.isRequired,
  onFocus: React.PropTypes.func.isRequired,
  bank: React.PropTypes.shape({
    displayName: React.PropTypes.shape({
      text: React.PropTypes.string
    }).isRequired,
  }).isRequired,
  focused: React.PropTypes.bool.isRequired,
  children: React.PropTypes.node,
  ariaLabel: React.PropTypes.string,
  isClickable: React.PropTypes.bool
};
