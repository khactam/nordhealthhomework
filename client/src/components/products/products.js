import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import BtnCellRenderer from "./BtnCellRenderer.jsx";
import ReactModal from 'react-modal';
import Product from '../product/product'
// ReactModal.defaultStyles.overlay.backgroundColor = 'cornsilk';

class Products extends Component {
    constructor(props) {
        super(props);
        let that = this;
        this.state = {
            showModalCreateProduct: false,
            showModalModifyProduct: false,
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
                            else {
                                const putMethod = {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-type': 'application/json; charset=UTF-8'
                                    }
                                }
                                fetch(window.restApiUrl + '/' + field.data.Id, putMethod).then(response => response.json())
                                    .then(data => that.retrieveProducts())
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
        this.handleOpenModalCreateProduct = this.handleOpenModalCreateProduct.bind(this)
        this.handleCloseModalCreateProduct = this.handleCloseModalCreateProduct.bind(this)
        this.handleCloseModalModifyProduct = this.handleCloseModalModifyProduct.bind(this)
    }
    componentDidMount() {
        this.retrieveProducts()
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
    handleAfterUpdateProduct() {
        this.retrieveProducts();
        this.handleCloseModalModifyProduct();
    }
    render() {
        return <div className="ag-theme-alpine" style={{ height: '50vh', width: '100wv' }} defaultcoldef={{
            flex: 1,
        }}>
            <AgGridReact
                rowData={this.state.rowData}
                columnDefs={this.state.columnDefs}
                defaultColDef={this.state.defaultColDef}
                frameworkComponents={this.state.frameworkComponents}
                suppressRowTransform={true}>
            </AgGridReact>
            <button style={{
                position: 'absolute',
                top: '15px',
                float: 'right',
                right: '10px'
            }} onClick={this.handleOpenModalCreateProduct}>Add new product</button>
            <ReactModal
                isOpen={this.state.showModalCreateProduct}
                contentLabel="Create product"
                onRequestClose={this.handleCloseModalCreateProduct}
                ariaHideApp={false}
            >
                <Product method="create" handleCloseModal={this.handleCloseModalCreateProduct} />
                <button onClick={this.handleCloseModalCreateProduct}>Close Modal</button>
            </ReactModal>

            <ReactModal
                isOpen={this.state.showModalModifyProduct}
                contentLabel="Modify product"
                onRequestClose={this.handleCloseModalModifyProduct}
                ariaHideApp={false}
            >
                <Product method="update" handleCloseModal={this.handleCloseModalModifyProduct} productData={this.state.productData} />
                <button onClick={this.handleCloseModalModifyProduct}>Close Modal</button>
            </ReactModal>

        </div>
    };
}

export default Products;