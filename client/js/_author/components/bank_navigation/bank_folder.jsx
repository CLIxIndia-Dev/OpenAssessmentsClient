import React from 'react';
import _ from 'lodash';
import ListItem from './list_item';

export default function BankFolder(props) {
  const { bank } = props;
  const displayName = _.get(bank, 'displayName.text');
  return (
    <ListItem
      {...props}
      isClickable
      ariaLabel={`Assessment catalog: ${displayName}`}
      selectItem={() => props.getBankChildren(bank.id)}
      onFocus={props.onFocus}
    >
      <td>
        <svg className="svg-24px">
          <use xlinkHref="/icons/MaterialDesign-svg-sprite-file-symbol.svg#ic_folder_24px" />
        </svg>
      </td>
      <td>{displayName}</td>
      <td />
      <td />
    </ListItem>
  );
}

BankFolder.propTypes = {
  bank: React.PropTypes.shape({
    displayName: React.PropTypes.shape({
      text: React.PropTypes.string
    }).isRequired,
  }).isRequired,
  getBankChildren: React.PropTypes.func.isRequired,
  onFocus: React.PropTypes.func.isRequired,
};
