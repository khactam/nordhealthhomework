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
            showModal: false,
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
                                that.handleOpenModal(field.data);
                            else {
                                console.log('delete')
                            }
                        }
                    }
                }],
            frameworkComponents: {
                btnCellRenderer: BtnCellRenderer
            },
            rowData: []
        };
        this.handleCloseModal = this.handleCloseModal.bind(this)
    }
    componentDidMount() {
        this.callBackendAPI()
            .then(res => this.setState({ rowData: res }))
            .then((res) => {
                console.log()
            })
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
    handleOpenModal(product) {
        this.setState({
            showModal: true,
            productData: product
        });
    }
    handleCloseModal() {
        this.setState({ showModal: false });
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
            }}>Add new product</button>
            <ReactModal
                isOpen={this.state.showModal}
                contentLabel="Modal #1 Global Style Override Example"
                onRequestClose={this.handleCloseModal}
                ariaHideApp={false}
            >
                <Product productData={this.state.productData} />
                <button onClick={this.handleCloseModal}>Close Modal</button>
            </ReactModal>
        </div>
    };
}

export default Products;