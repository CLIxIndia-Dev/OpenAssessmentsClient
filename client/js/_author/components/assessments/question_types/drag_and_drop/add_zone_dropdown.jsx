import React      from 'react';
import localize   from '../../../../locales/localize';

function addZoneDropdown(props) {
  const strings = props.localizeStrings('addZoneDropDown');

  return (
    <ul className="au-c-button-dropdown au-u-ml-sm" >
      <li>
        <button
          className="au-c-btn au-c-btn--sm au-c-btn--dropdown"
          onClick={props.toggle}
        >
          {props.text}
          <svg className="svg-24px">
            <use href="/icons/MaterialDesign-svg-sprite-navigation-symbol.svg#ic_arrow_drop_down_24px" />
          </svg>
        </button>
        <ul className={`au-c-button-dropdown__dropdown ${props.active ? 'is-active' : ''}`}>
          <li>
            <button
              id={`reg_${props.text}`}
              className="au-c-btn au-c-btn--sm au-c-btn--dropdown-item"
              onClick={props.addByRegion}
            >
              <svg className="svg-24px">
                <use href="/icons/MaterialDesign-svg-sprite-action-symbol.svg#ic_open_in_new_24px" />
              </svg>
              {strings.byRegion}
            </button>
          </li>
          <li>
            <button
              id={`image_${props.text}`}
              className="au-c-btn au-c-btn--sm au-c-btn--dropdown-item"
              onClick={props.addByImage}
            >
              <svg className="svg-24px">
                <use href="/icons/MaterialDesign-svg-sprite-image-symbol.svg#ic_image_24px" />
              </svg>
              {strings.byImage}
            </button>
          </li>
        </ul>
      </li>
    </ul>
  );
}

addZoneDropdown.propTypes = {
  active: React.PropTypes.bool,
  text: React.PropTypes.string.isRequired,
  toggle: React.PropTypes.func.isRequired,
  addByRegion: React.PropTypes.func.isRequired,
  addByImage: React.PropTypes.func.isRequired,
  localizeStrings: React.PropTypes.func.isRequired,
};

export default localize(addZoneDropdown);
