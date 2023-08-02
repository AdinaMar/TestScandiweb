import React, { Component } from 'react';

class Button extends Component {
  render() {
    const { text, onClick, className, id } = this.props;

    return (
      <button className={className} onClick={onClick} id={id}>
        {text}
      </button>
    );
  }
}

export default Button;