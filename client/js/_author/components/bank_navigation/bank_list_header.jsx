import React        from 'react';
import localize     from '../../locales/localize';

function bankListHeader(props) {
  const strings = props.localizeStrings('bankListHeader');
  return (
    <table className="au-c-table">
      <thead>
        <tr>
          <th />
          <th>
            <button
              className={props.sortName ? 'au-c-table__filter is-active' : 'au-c-table__filter'}
              onClick={() => props.sortBy('sortName')}
            >
              {strings.name}
              <svg className={props.sortName === 'desc' ? 'svg-24px top is-active' : 'svg-24px top'}>
                <use href="/icons/MaterialDesign-svg-sprite-hardware-symbol.svg#ic_keyboard_arrow_up_24px" />
              </svg>
              <svg className={props.sortName === 'asc' ? 'svg-24px bottom is-active' : 'svg-24px bottom'}>
                <use href="/icons/MaterialDesign-svg-sprite-hardware-symbol.svg#ic_keyboard_arrow_down_24px" />
              </svg>
            </button>
          </th>
          <th>
            <button
              className={props.sortPublished ? 'au-c-table__filter is-active' : 'au-c-table__filter'}
              onClick={() => props.sortBy('sortPublished')}
            >
              {strings.published}
              <svg className={props.sortPublished === 'desc' ? 'svg-24px top is-active' : 'svg-24px top'}>
                <use href="/icons/MaterialDesign-svg-sprite-hardware-symbol.svg#ic_keyboard_arrow_up_24px" />
              </svg>
              <svg className={props.sortPublished === 'asc' ? 'svg-24px bottom is-active' : 'svg-24px bottom'}>
                <use href="/icons/MaterialDesign-svg-sprite-hardware-symbol.svg#ic_keyboard_arrow_down_24px" />
              </svg>
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
