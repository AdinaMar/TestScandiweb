import React from 'react';
import Button from './button/Button';
import Product from './Product';
import { Link } from 'react-router-dom';


class ProductComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [], // Initialize the products state to an empty array
      selectedProductIds: [], // Initialize an empty array to store the selected product IDs
    };
  }
  fetchProducts = () => {
    fetch('https://juniortestadinamartiniuc.000webhostapp.com/get_items.php') // Replace with your API URL
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => this.setState({ products: data }))
      .catch((error) => console.error('Error fetching data:', error));
  };
  componentDidMount() {
    // Fetch data from the API and update the products state
   
      this.fetchProducts();
  }

  handleCheckboxChange = (id, checked) => {
    this.setState((prevState) => {
      if (checked) {
        // If the checkbox is checked, add the product ID to the selectedProductIds array
        return { selectedProductIds: [...prevState.selectedProductIds, id] };
      } else {
        // If the checkbox is unchecked, remove the product ID from the selectedProductIds array
        return { selectedProductIds: prevState.selectedProductIds.filter((productId) => productId !== id) };
      }
    });
  };

  handleProductSelect = (product) => {
    const { selectedProductIds } = this.state;
    const isProductSelected = selectedProductIds.includes(product.id);
  
    if (isProductSelected) {
      // If the product is already selected, remove it from the selectedProductIds array
      const updatedProductIds = selectedProductIds.filter((productId) => productId !== product.id);
      this.setState({ selectedProductIds: updatedProductIds });
    } else {
      // If the product is not selected, add it to the selectedProductIds array
      this.setState((prevState) => ({
        selectedProductIds: [...prevState.selectedProductIds, product.id],
      }));
    }
  };

  
  
  
  
  
  

  handleMassDelete = () => {
    const { selectedProductIds } = this.state;
    console.log('Selected Product IDs:', selectedProductIds); 
  
    // Convert the selected product IDs to a comma-separated string
    const selectedProductIdsString = selectedProductIds.join(',');
  
    // Create a new instance of URLSearchParams to build the form data
    const formData = new URLSearchParams();
    formData.append('selectedProductIds', selectedProductIdsString);
  
    // Send the selected product IDs to the server for mass deletion as form data
    fetch('https://juniortestadinamartiniuc.000webhostapp.com/mass-delete.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    })
    .then((response) => {
      console.log('Response:', response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Deletion result:', data);
      if (data.success) {
        // If the deletion was successful, update the state to remove the deleted products
        const updatedProducts = this.state.products.filter(
          (product) => !selectedProductIds.includes(product.id)
        );
  
        // Update the state directly without calling fetchProducts again
        this.setState({
          products: updatedProducts,
          selectedProductIds: [], // Clear the selectedProductIds array after successful deletion
        });
      }
    })
    .catch((error) => console.error('Error during deletion:', error));
  };
  

  render() {
  const { products, selectedProductIds } = this.state;


    return (
      <div>
     <div className= "title">
        <h1>Product List</h1>
        <div className="buttons">
          <Link to="/add-product">
        <Button text={"ADD"}/> </Link>
        <Button text={"MASS DELETE"} id={"delete-product-btn"} onClick={this.handleMassDelete} />
        </div>
        </div>
        <hr />
        <ul className="productsContainer">
          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
              onProductSelect={this.handleProductSelect} 
              selectedProductIds={selectedProductIds}
            />
          ))}
        </ul>
       
   
      </div>
    );
  }
}

export default ProductComponent;
