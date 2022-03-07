import React, { Component } from 'react';
class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.productData,
            newName: this.props.productData.Name,
            newBarCode: this.props.productData.BarCode
        }
        this.onNameChange = this.onNameChange.bind(this);
        this.onBarCodeChange = this.onBarCodeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onNameChange(event) {
        this.setState({ newName: event.target.value });
    }
    onBarCodeChange(event) {
        this.setState({ newBarCode: event.target.value });
    }
    handleSubmit(event) {
        const productData = {
            Id: this.state.data.Id,
            Name: this.state.newName,
            BarCode: this.state.newBarCode
        }
        const putMethod = {
            method: 'PUT', // Method itself
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },
            body: JSON.stringify(productData) // We send data in JSON format
        }
        fetch(window.restApiUrl, putMethod).then(response => response.json())
            .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
            .catch(err => console.log(err))
        event.preventDefault();
    }
    render() {
        return <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" defaultValue={this.state.data.Name} onChange={this.onNameChange} />
                </label>
                <br />
                <label>
                    BarCode:
                    <input type="number" name="barcode" defaultValue={this.state.data.BarCode} onChange={this.onBarCodeChange} />
                </label>
                <input type="submit" value="Update" />
            </form>
        </div>
    }
}
export default Product;