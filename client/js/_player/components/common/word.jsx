import React            from "react";

export default class Word extends React.Component {
  render() {
    const className = this.props.hide ? this.props.className + " u-hide" : this.props.className;
    return (
      <div
        className={className}
        aria-hidden={this.props.hide}
        dangerouslySetInnerHTML={{ __html: this.props.material }}
      />)
  }
}
