import React, { Component } from 'react';
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            cartId: localStorage.getItem('CartId')
        }
    }
    componentDidMount() {
        let cartId = localStorage.getItem('CartId');
        if (cartId) {
            this.setState({ cartId: cartId })
            this.getCartItems()
                .then(res => this.setState({ items: res }))
                .catch(err => console.log(err));
        }
        else {
            this.createCart()
        }
    }
    getCartItems = async () => {
        const response = await fetch(window.restApiUrl + "/cartItems/" + this.state.cartId);
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    }
    createCart = async () => {
        const that = this;
        const method = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({})
        }
        fetch(window.restApiUrl + '/cart', method).then(response => response.json())
            .then((data) => {
                if (data.status === 'Post success') {
                    localStorage.setItem('CartId', data.cart.Id)
                    that.setState({ cartId: data.cart.Id })
                }
            })
            .catch(err => console.log(err))
    }
    removeItemFromCart = async (item) => {
        const that = this;
        let temp = that.state.items
        const method = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({})
        }
        fetch(window.restApiUrl + '/cartItems/' + item.Id, method).then(response => response.json())
            .then((data) => {
                if (data === 'Deleted successfully') {
                    temp.splice(temp.indexOf(item), 1)
                    that.setState({ items: temp })
                }
            })
            .catch(err => console.log(err))
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
    listItems() {
        const items = this.state.items.map((item) =>
            <li key={item.Id}>
                <button value={item} onClick={() => this.removeItemFromCart(item)}>X</button>
                <span>{item.Product.Name} - {item.Product.BarCode}</span>
            </li>
        )
        return <ul>{items}</ul>
    }
    render() {
        return <div>{this.listItems()}</div>
    }
}
export default Cart;