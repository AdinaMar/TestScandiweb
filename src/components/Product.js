import React from 'react';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }
  handleCheckboxChange = () => {
    const { product, onProductSelect } = this.props;
    onProductSelect(product); // Pass the selected product to the parent component (ProductComponent)
  };

  renderAttributes = (attributes) => {
    const attributeKeys = Object.keys(attributes);
    const displayTextMap = {
      weight: "KG",
      size: "MB",
      dimensions: "", // Add other mappings here if needed
    };
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    return attributeKeys.map((key) => {
      if (key === "id") {
        return null;
      }

      const displayText = displayTextMap[key] || "";
      const capitalizedKey = capitalizeFirstLetter(key);
      return (
        <p key={key}>
          <span className="">{capitalizedKey}</span> : {attributes[key]} {displayText}
        </p>
      );
    });
  
  };

  render() {
    const { product, selectedProductIds } = this.props;
    const { sku, name, price, type, ...attributes } = product;
    const checked = selectedProductIds.includes(product.id);

    return (
      <li className="productCard" key={product.id}>
        <input
          className="delete-checkbox"
          type="checkbox"
          checked={checked}
          onChange={this.handleCheckboxChange} 
        />
        <p>{product.sku}</p>
        <p>{product.name}</p>
        <p>{product.price} $</p>
       <p> {this.renderAttributes(attributes)}</p>
      </li>
    );
  }
}

export default Product;
