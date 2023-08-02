import React from 'react';
import Button from './components/button/Button';
import { Link } from 'react-router-dom';
import BookComponent from './components/BookComponent';
import DVDComponent from './components/DVDComponent';
import FurnitureComponent from './components/FurnitureComponent';


class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sku: '',
      name: '',
      price: '',
      size: '',
      weight: '',
      width:'',
      height: '',
      length: '',
      productType: 'Type Switcher',
      attributeType: '',
      attributeValue: '',
      submitted: false,
    };
  }


  handleValidation = () => {
    const errors = {};

    if (this.state.productType === 'Type Switcher') {
      errors.productType = 'Please, select a product type.';
    }

    if (this.state.sku === '') {
      errors.sku = 'Please, provide SKU.';
    }

    if (this.state.name === '') {
      errors.name = 'Please, provide name.';
    }

    if (this.state.price === '') {
      errors.price = 'Please, provide price.';
    }   else if (isNaN(Number(this.state.price))) {
        errors.price = 'Please, provide the data of indicated type.';
      }

    if (this.state.productType === 'Size' && this.state.size === '') {
      errors.size = 'Please, provide size.';
    } else if (this.state.productType === 'Size' && isNaN(Number(this.state.size))) {
        errors.size = 'Please, provide the data of indicated type.';
      }

    if (this.state.productType === 'Weight' && this.state.weight === '') {
      errors.weight = 'Please, provide weight.';
    } else if (this.state.productType === 'Weight' && isNaN(Number(this.state.weight))) {
        errors.weight = 'Please, provide the data of indicated type.';
      }

    if (this.state.productType === 'Dimension') {
      if (this.state.height === '') {
        errors.height = 'Please, provide height.';
    } else if (isNaN(Number(this.state.height))) {
        errors.height = 'Please, provide the data of indicated type.';
      }
      
      if (this.state.width === '') {
        errors.width = 'Please, provide width.';
    } else if (isNaN(Number(this.state.width))) {
        errors.width = 'Please, provide the data of indicated type.';
      }
      if (this.state.length === '') {
        errors.length = 'Please, provide length.';
    } else if (isNaN(Number(this.state.length))) {
        errors.length = 'Please, provide the data of indicated type.';
      }
    }

    return errors;
  };

  
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,

    });
  };

  handleTypeChange = (event) => {
    const selectedType = event.target.value;
    this.setState({
      productType: selectedType === '' ? 'Type Switcher' : selectedType,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { sku, name, price, productType, size, weight, width, length, height, attributeType, attributeValue } = this.state;
  console.log(this.state);
  this.setState({ submitted: true });

  // Check for validation errors
  const errors = this.handleValidation();
  if (Object.keys(errors).length > 0) {
    // If there are errors, prevent form submission
    return;
  }

 
  // Create a new FormData object to send the form data to the server
    const dimensionString = `${height}x${width}x${length}`;
    const formData = new FormData();
    formData.append('sku', sku);
    formData.append('name', name);
    formData.append('price', price);

    const attributeValueMap = {
        Size : size,
        Weight: weight,
        Dimension: dimensionString,
      };
    console.log(productType);
  
      formData.append('attributeValue', attributeValueMap[productType] || '');
    
      formData.append('attributeType', productType);
    

    for(const entry of formData.entries()){
        const [key, value] = entry;
        console.log(`${key}: ${value}`);
    }
    console.log(formData);
    // Send the form data to your PHP backend using fetch
    fetch('https://juniortestadinamartiniuc.000webhostapp.com/save-item.php', {

      method: 'POST',
      body: formData,
    })
    .then((response) => {
        console.log(response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response.json());
      return response 
    })
    
    .then((data) => {
      console.log('Item added successfully:', data); 
    
      window.location.href = '/';
      this.setState({
        sku: '',
        name: '',
        price: '',
        size: '',
        weight: '',
        width: '',
        height: '',
        length: '',
        productType: 'Type Switcher',
        attributeType: '',
        attributeValue: '',
        submitted: false,
      });
     })
   
    .catch((error) => console.error('Error adding item:', error));
  };
  

  render() {
    const { productType, submitted } = this.state;
    const { sku, name, price, size, weight, width, length, height, attributeType, attributeValue } = this.state;
   

    const errors = this.handleValidation();
    return (
      <div className="pageContainer">
        <div className="title">
          <h1>Product Add</h1>
          <div className="buttons">
            <Button text={"Save"} onClick={this.handleSubmit} />

            <Link to="/">
              <Button text={"Cancel"} />
            </Link>
          </div>
        </div>
        <hr />
        <form id="product_form" onSubmit={this.handleSubmit} className="formContainer">
          <div className="inputContainer">
            <div className="labelWrapper">
            <label htmlFor="sku">SKU</label>
            </div>
            <input
           className="inputField"
              type="text"
              id="sku"
              name="sku"
              value={this.state.sku}
              onChange={this.handleInputChange}
              required
            />
             {submitted && errors.sku && <p className="errorText">{errors.sku}</p>}
          </div>
          <div className="inputContainer">
          <div className="labelWrapper">
            <label htmlFor="name">Name</label>
            </div>
            <input
            className="inputField"
              type="text"
              id="name"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
              required
            />
              {submitted && errors.name && <p className="errorText">{errors.name}</p>} {/* Display error message if sku is missing and the form is submitted */}
          </div>
          <div className="inputContainer">
            <div className="labelWrapper">
            <label htmlFor="price">Price ($)</label>
            </div>
            <input
            className="inputField"
              type="text"
              id="price"
              name="price"
              value={this.state.price}
              onChange={this.handleInputChange}
              required
            />
               {submitted && errors.price && <p className="errorText">{errors.price}</p>} {/* Display error message if sku is missing and the form is submitted */}
          </div>
          
          <div className="inputContainerSelect">
          <label htmlFor="productType">Type Switcher:</label>
          <select
            id="productType"
            name="productType"
            value={productType}
            onChange={this.handleTypeChange} 
            className="selectField"
            required
          >
            <option>Type Switcher</option>
            {/* Default option with an empty value */}
            <option value="Size" id="DVD">
              DVD
            </option>
            <option value="Weight" id="Book">
              Book
            </option>
            <option value="Dimension" id="Furniture">
              Furniture
            </option>
          </select>
          {submitted && errors.productType && <p className="errorText">{errors.productType}</p>}
          </div>
        

          {/* Conditionally render the corresponding component based on the selected productType */}
          {productType === 'Weight' && <BookComponent sku={sku} name={name} price={price} weight={weight} handleInputChange={this.handleInputChange} />}
          {submitted && errors.weight && <p>{errors.weight}</p>}
          {productType === 'Size' && (
            <DVDComponent sku={sku} name={name} price={price} size={size} handleInputChange={this.handleInputChange} />
          )}
          {submitted && errors.size && <p className="errorText">{errors.size}</p>}
          {productType === 'Dimension' && <FurnitureComponent sku={sku} name={name} price={price} height={height} width={width} length={length} handleInputChange={this.handleInputChange} />}
          {submitted && errors.height && <p className="errorText">{errors.height}</p>}
              {submitted && errors.width && <p className="errorText"> {errors.width}</p>}
              {submitted && errors.length && <p className="errorText">{errors.length}</p>}
        </form>

     
      </div>
    );
  }
}

export default AddItem;