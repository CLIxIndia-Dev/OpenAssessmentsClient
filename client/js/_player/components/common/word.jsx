import React from 'react';

export default class Word extends React.PureComponent {
  static propTypes = {
    material: React.PropTypes.bool.isRequired,
    className: React.PropTypes.string.isRequired,
    hide: React.PropTypes.bool
  };

  render() {
    const className = this.props.hide ? `${this.props.className} u-hide` : this.props.className;
    return (<div
      className={className}
      dangerouslySetInnerHTML={{ __html: this.props.material }}
    />);
  }
}
