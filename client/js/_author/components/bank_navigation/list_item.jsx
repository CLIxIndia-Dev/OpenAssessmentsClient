import React from 'react';
import PropTypes from 'prop-types';

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
        className={props.focused ? 'au-c-table__tr-focused' : ''}
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
  selectItem: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  bank: PropTypes.shape({
    displayName: PropTypes.shape({
      text: PropTypes.string
    }).isRequired,
  }).isRequired,
  focused: PropTypes.bool.isRequired,
  children: PropTypes.node,
  ariaLabel: PropTypes.string,
  isClickable: PropTypes.bool
};
