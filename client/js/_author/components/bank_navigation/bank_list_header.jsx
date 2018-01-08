import React        from 'react';
import localize     from '../../locales/localize';

function bankListHeader(props) {
  const strings = props.localizeStrings('bankListHeader');
  let ariaLabelName = 'unsorted';
  let ariaLabelPublished = 'unsorted';
  let nextStateName = 'ascending';
  let nextStatePublished = 'ascending';

  if (props.sortName) {
    // Should match the cycle set in _bank_navigator.jsx
    ariaLabelName = props.sortName === 'desc' ? 'descending' : 'ascending';
    nextStateName = props.sortName === 'desc' ? 'unsorted' : 'descending';
  }

  if (props.sortPublished) {
    // Should match the cycle set in _bank_navigator.jsx
    ariaLabelPublished = props.sortPublished === 'desc' ? 'descending' : 'ascending';
    nextStatePublished = props.sortPublished === 'desc' ? 'unsorted' : 'descending';
  }
  return (
    <table className="au-c-table">
      <thead>
        <tr>
          <th />
          <th>
            <button
              aria-label={`Sort by Name, currently ${ariaLabelName}. Click to change to ${nextStateName}.`}
              className={props.sortName ? 'au-c-table__filter is-active' : 'au-c-table__filter'}
              onClick={() => props.sortBy('sortName')}
            >
              {strings.name}
              <i
                aria-hidden
                className={props.sortName === 'asc' ? 'material-icons top is-active' : 'material-icons top'}
              >
                keyboard_arrow_up
              </i>
              <i
                aria-hidden
                className={props.sortName === 'desc' ? 'material-icons bottom is-active' : 'material-icons bottom'}
              >
                keyboard_arrow_down
              </i>
            </button>
          </th>
          <th>
            <button
              aria-label={`Sort by Published, currently ${ariaLabelPublished}. Click to change to ${nextStatePublished}.`}
              className={props.sortPublished ? 'au-c-table__filter is-active' : 'au-c-table__filter'}
              onClick={() => props.sortBy('sortPublished')}
            >
              {strings.published}
              <i
                aria-hidden
                className={props.sortPublished === 'asc' ? 'material-icons top is-active' : 'material-icons top'}
              >
                keyboard_arrow_up
              </i>
              <i
                aria-hidden
                className={props.sortPublished === 'desc' ? 'material-icons bottom is-active' : 'material-icons bottom'}
              >
                keyboard_arrow_down
              </i>
            </button>
          </th>
          <th />
        </tr>
      </thead>
    </table>
  );
}

bankListHeader.propTypes = {
  sortBy          : React.PropTypes.func.isRequired,
  localizeStrings : React.PropTypes.func.isRequired,
  sortName        : React.PropTypes.string,
  sortPublished   : React.PropTypes.string,
};

export default localize(bankListHeader);
