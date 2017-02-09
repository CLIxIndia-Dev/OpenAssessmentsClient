import React      from 'react';
import appHistory from '../../history';
import Icon       from './bank_icon';

// TODO: think about breaking this into smaller components
export default function bankListItem(props) {
  const { bank } = props;
  const isAssessment = bank.type === 'Assessment';
  const buttonContainer = {
    display: isAssessment ? '' : 'none',
  };

  const selectItem = () => {
    if (bank.type === 'Assessment') {
      appHistory.push(`banks/${bank.bankId}/assessments/${bank.id}`);
    } else {
      props.getBankChildren(bank);
    }
  };

  return (
    <tr
      onClick={() => selectItem()}
      tabIndex="0"
      role="button"
      aria-label={bank.displayName ? bank.displayName.text : 'bank item'}
    >
      <td><Icon type={bank.type} /></td>
      <td>{bank.displayName ? bank.displayName.text : null}</td>
      <td>
        <button className="c-btn c-btn--square c-publish" style={buttonContainer}>
          <Icon type={bank.published ? 'Published' : 'Publish'} />
        </button>
      </td>
      <td>
        <div className="c-table__icons" style={buttonContainer}>
          <button className="c-btn c-btn--sm c-btn--table">
            embed code
          </button>
          <button className="c-btn c-btn--square c-btn--table">
            <i className="material-icons">edit</i>
          </button>
          <button className="c-btn c-btn--square c-btn--table">
            <i className="material-icons">remove_red_eye</i>
          </button>
          <button
            className="c-btn c-btn--square c-btn--table"
            onClick={() => props.deleteAssessment(bank.bankId, bank.id)}
          >
            <i className="material-icons">delete</i>
          </button>
        </div>
      </td>
    </tr>
  );
}

bankListItem.propTypes = {
  bank: React.PropTypes.shape({
    displayName : React.PropTypes.shape({}),
  }).isRequired,
};
