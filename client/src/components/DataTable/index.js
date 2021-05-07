import React, { Component } from 'react';
import DataTable from 'react-data-table-component';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
  render() {
      const {columns, data, title, pagination} = this.props;
    return (
      <DataTable
        title={title ? title : ''}
        columns={columns}
        data={data}
        pagination={pagination}
      />
    )
  }
};


export default Table;