import React        from 'react';
import localize     from '../../locales/localize';

function bankListHeader(props) {
  const strings = props.localizeStrings('bankListHeader');
  let ariaLabelName = 'unsorted';
  let ariaLabelPublished = 'unsorted';

  if (props.sortName) {
    ariaLabelName = props.sortName === 'desc' ? 'descending' : 'ascending';
  }

  if (props.sortPublished) {
    ariaLabelPublished = props.sortPublished === 'desc' ? 'descending' : 'ascending';
  }
  return (
    <table className="au-c-table">
      <thead>
        <tr>
          <th />
          <th>
            <button
              aria-label={`Sort by Name, currently ${ariaLabelName}`}
              className={props.sortName ? 'au-c-table__filter is-active' : 'au-c-table__filter'}
              onClick={() => props.sortBy('sortName')}
            >
              {strings.name}
              <i
                aria-label="ascending"
                className={props.sortName === 'asc' ? 'material-icons top is-active' : 'material-icons top'}>
                keyboard_arrow_up
              </i>
              <i
                aria-label="descending"
                className={props.sortName === 'desc' ? 'material-icons bottom is-active' : 'material-icons bottom'}>
                keyboard_arrow_down
              </i>
            </button>
          </th>
          <th>
            <button
              aria-label={`Sort by Published, currently ${ariaLabelPublished}`}
              className={props.sortPublished ? 'au-c-table__filter is-active' : 'au-c-table__filter'}
              onClick={() => props.sortBy('sortPublished')}
            >
              {strings.published}
              <i
                aria-label="ascending"
                className={props.sortPublished === 'asc' ? 'material-icons top is-active' : 'material-icons top'}>
                keyboard_arrow_up
              </i>
              <i
                aria-label="descending"
                className={props.sortPublished === 'desc' ? 'material-icons bottom is-active' : 'material-icons bottom'}>
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
