import React, { Component } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import BtnCellRenderer from "./BtnCellRenderer.jsx";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                    clicked: function(field) {
                        console.log(field)
                    }
                }
            }],
            frameworkComponents: {
                btnCellRenderer: BtnCellRenderer
            },
            rowData: []
        };
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
        const response = await fetch('http://127.0.0.1:8000/store');
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    cellRenderer = () => {
        const imageSource = `./assets/delete.svg`;
        return (
            `<img src=${imageSource} style="width:20px"/>`
        )
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
        </div>
    };
}

export default Products;