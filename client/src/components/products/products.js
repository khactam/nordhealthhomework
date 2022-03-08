import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Popover } from 'react-tiny-popover'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import BtnCellRenderer from "./BtnCellRenderer.jsx";
import ReactModal from 'react-modal';
import Product from '../product/product'
import Cart from '../cart/cart'
// ReactModal.defaultStyles.overlay.backgroundColor = 'cornsilk';

class Products extends Component {
    constructor(props) {
        super(props);
        let that = this;
        this.state = {
            showModalCreateProduct: false,
            showModalModifyProduct: false,
            showModalCart: false,
            cartId: localStorage.getItem('CartId'),
            defaultColDef: {
                flex: 1,
                minWidth: 150,
                filter: true,
                sortable: true
            },
            columnDefs: [
                {
                    field: 'Name'
                },
                {
                    field: 'BarCode'
                },
                {
                    field: 'Action',
                    cellRenderer: 'btnCellRenderer',
                    cellRendererParams: {
                        clicked: function (field) {
                            if (field.action === 'modify')
                                that.handleOpenModalModifyProduct(field.data);
                            else if (field.action === 'delete') {
                                const method = {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-type': 'application/json; charset=UTF-8'
                                    }
                                }
                                fetch(window.restApiUrl + '/' + field.data.Id, method).then(response => response.json())
                                    .then(data => that.retrieveProducts())
                                    .catch(err => console.log(err))
                            }
                            else {
                                console.log('to cart', field)
                                let createCartItemData = {
                                    Cart_id : localStorage.getItem('CartId'),
                                    Product_id : field.data.Id
                                }
                                const that = this;
                                const method = {
                                    method: 'POST',
                                    headers: {
                                        'Content-type': 'application/json; charset=UTF-8'
                                    },
                                    body: JSON.stringify(createCartItemData)
                                }
                                fetch(window.restApiUrl + '/cartItems', method).then(response => response.json())
                                    .then((data) => {
                                        console.log(data)
                                    })
                                    .catch(err => console.log(err))
                            }
                        }
                    }
                }],
            frameworkComponents: {
                btnCellRenderer: BtnCellRenderer
            },
            rowData: []
        };
        this.handleAfterUpdateProduct = this.handleAfterUpdateProduct.bind(this)
        this.retrieveProducts = this.retrieveProducts.bind(this)
        this.callBackendAPI = this.callBackendAPI.bind(this)
        this.handleOpenModalCart = this.handleOpenModalCart.bind(this)
        this.handleCloseModalCart = this.handleCloseModalCart.bind(this)
        this.handleOpenModalCreateProduct = this.handleOpenModalCreateProduct.bind(this)
        this.handleCloseModalCreateProduct = this.handleCloseModalCreateProduct.bind(this)
        this.handleCloseModalModifyProduct = this.handleCloseModalModifyProduct.bind(this)
    }
    componentDidMount() {
        this.retrieveProducts()
        let cartId = localStorage.getItem('CartId');
        if (!cartId) {
            this.createCart()
        }
        else {
            this.setState({ cartId: cartId })
        }
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
    retrieveProducts() {
        this.callBackendAPI()
            .then(res => this.setState({ rowData: res }))
            .catch(err => console.log(err));
    }
    callBackendAPI = async () => {
        const response = await fetch(window.restApiUrl);
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    }
    handleOpenModalCreateProduct() {
        this.setState({ showModalCreateProduct: true });
    }
    handleCloseModalCreateProduct() {
        this.setState({ showModalCreateProduct: false });
    }
    handleOpenModalModifyProduct(product) {
        this.setState({
            showModalModifyProduct: true,
            productData: product
        });
    }
    handleCloseModalModifyProduct() {
        this.setState({ showModalModifyProduct: false });
    }
    handleOpenModalCart() {
        this.setState({ showModalCart: true });
    }
    handleCloseModalCart() {
        this.setState({ showModalCart: false });
    }
    handleAfterUpdateProduct() {
        this.retrieveProducts();
        this.handleCloseModalModifyProduct();
        this.handleCloseModalCreateProduct();
    }
    render() {
        return <div className="ag-theme-alpine" style={{ height: '50vh', width: '100wv' }} defaultcoldef={{ flex: 1 }}>

            <AgGridReact
                rowData={this.state.rowData}
                columnDefs={this.state.columnDefs}
                defaultColDef={this.state.defaultColDef}
                frameworkComponents={this.state.frameworkComponents}
                suppressRowTransform={true}>
            </AgGridReact>

            <button style={{ position: 'absolute', top: '15px', float: 'right', right: '55px' }} onClick={this.handleOpenModalCreateProduct}>Add new product</button>
            <button style={{ position: 'absolute', top: '15px', float: 'right', right: '10px' }} onClick={this.handleOpenModalCart}>Cart</button>

            <ReactModal
                isOpen={this.state.showModalCreateProduct}
                onRequestClose={this.handleCloseModalCreateProduct}
                ariaHideApp={false}>
                <Product handleAfterUpdateProduct={this.handleAfterUpdateProduct} method="create" handleCloseModal={this.handleCloseModalCreateProduct} />
                <button onClick={this.handleCloseModalCreateProduct}>Close Modal</button>
            </ReactModal>

            <ReactModal
                isOpen={this.state.showModalModifyProduct}
                onRequestClose={this.handleCloseModalModifyProduct}
                ariaHideApp={false}>
                <Product handleAfterUpdateProduct={this.handleAfterUpdateProduct} method="update" handleCloseModal={this.handleCloseModalModifyProduct} productData={this.state.productData} />
                <button onClick={this.handleCloseModalModifyProduct}>Close Modal</button>
            </ReactModal>

            <ReactModal
                isOpen={this.state.showModalCart}
                onRequestClose={this.handleCloseModalCart}
                ariaHideApp={false}>
                <Cart />
                <button onClick={this.handleCloseModalCart}>Close cart</button>
            </ReactModal>
        </div>
    };
}

export default Products;