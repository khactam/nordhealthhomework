import React, { Component } from 'react';
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                    Id: 1,
                    Name: 'test',
                    BarCode: 1
                }
            ]
        }
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
                this.props.handleCloseModal()
            })
            .catch(err => console.log(err))
        event.preventDefault();
    }
    removeFromCart(item) {
        console.log(item)
    }
    listItems() {
        const items = this.state.items.map((item) =>
            <li key={item.Id}>
                <button value={item} onClick={() => this.removeFromCart(item)}>X</button>
                <span>{item.Name} - {item.BarCode}</span>
            </li>
        )
        return <ul>{items}</ul>
    }
    render() {
        return <div>{this.listItems()}</div>
    }
}
export default Cart;