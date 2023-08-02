import React from 'react';

class FurnitureComponent extends React.Component {
  render() {
    const { height, width, length, handleInputChange } = this.props;
    return (
      <div>
         
          <div className="inputContainer">
            <div className="labelWrapper">
            <label htmlFor="height">Height (CM):</label>
            </div>
            <input
            type="text"
            id="height"
            name="height"
            defaultValue={height}
            onChange={handleInputChange}
            required
          />
          </div>
          <div className="inputContainer">
          <div className="labelWrapper">
            <label htmlFor="width">Width (CM):</label>
            </div>
            <input
            type="text"
            id="width"
            name="width"
            defaultValue={width}
            onChange={handleInputChange}
            required
          />
          </div>
          <div className="inputContainer">
          <div className="labelWrapper">
            <label htmlFor="length">Length (CM):</label>
            </div>
            <input
            type="text"
            id="length"
            name="length"
            defaultValue={length}
            onChange={handleInputChange}
            required
          />
          </div>
     
        <p className='textProducts'>Please, provide dimensions in HxWxL format.</p>
      </div>
    );
  }
}

export default FurnitureComponent;