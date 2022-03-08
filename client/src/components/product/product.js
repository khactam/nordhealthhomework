import React, { Component } from 'react';
class Product extends Component {
    constructor(props) {
        super(props);
        if (this.props.productData) {
            this.state = {
                data: this.props.productData,
                newName: this.props.productData.Name,
                newBarCode: this.props.productData.BarCode
            }
        }
        else {
            this.state = {
                newName: '',
                newBarCode: ''
            }
        }
        this.state.method = this.props.method;
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
            Name: this.state.newName,
            BarCode: this.state.newBarCode
        }
        if (this.state.method === 'update') productData.Id = this.state.data.Id
        const putMethod = {
            method: this.state.method === 'update' ? 'PUT' : 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(productData)
        }

        fetch(window.restApiUrl, putMethod).then(response => response.json())
            .then((data) => {
                this.props.handleAfterUpdateProduct()
            })
            .catch(err => console.log(err))
        event.preventDefault();
    }
    render() {
        return <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" defaultValue={this.state.newName} onChange={this.onNameChange} />
                </label>
                <br />
                <label>
                    BarCode:
                    <input type="number" name="barcode" defaultValue={this.state.newBarCode} onChange={this.onBarCodeChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    }
}
export default Product;