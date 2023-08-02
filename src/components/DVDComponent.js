import React from 'react';

class DVDComponent extends React.Component {
  render() {
    const { size, handleInputChange } = this.props;
    return (
      <div>
        <div className="inputContainer">
          <div className="labelWrapper">
          <label htmlFor="size">Size (MB):</label>
          </div>
          <input
            type="text"
            id="size"
            name="size"
            defaultValue={size}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Add other DVD-specific information here */}
        <p className="textProducts">Please, provide size in MB.</p>
      </div>
    );
  }
}

export default DVDComponent;
