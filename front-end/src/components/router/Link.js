import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Link extends Component {
  static contextTypes = {
    route: PropTypes.string,
    linkHandler: PropTypes.func
  }
  
  handleClick = e => {
    e.preventDefault();
    this.context.linkHandler(this.props.to)
  }

  render() {
    const { to, children } = this.props;
    const activeClass = this.context.route === to ? 'active' : '';
    return (
      <a href='#' className={activeClass} onClick={this.handleClick}>{children}</a>
    )
  }
}

Link.propTypes = {
  to: PropTypes.string.isRequired
}
