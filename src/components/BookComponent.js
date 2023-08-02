import React from 'react';

class BookComponent extends React.Component {
  render() {
    const { weight, handleInputChange } = this.props;
    return (
      <div>

          <div className="inputContainer">
            <div className="labelWrapper">
            <label htmlFor="weight">Weight (KG):</label>
            </div>
            <input
            type="text"
            id="weight"
            name="weight"
            defaultValue={weight}
            onChange={handleInputChange}
            required
          />
          </div>

        <p className="textProducts">Please, provide weight in kg.</p>
      </div>
    );
  }
}

export default BookComponent;