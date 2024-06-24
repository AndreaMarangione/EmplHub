import React from 'react';
import DataTable from 'react-data-table-component';

const MyTable = ({ columns, data }) => {
    return (
        <DataTable
            columns={columns}
            data={data}
            direction="auto"
            fixedHeader
            fixedHeaderScrollHeight="600px"
            highlightOnHover
            noHeader
            pagination
            pointerOnHover
            responsive
            striped
        />
    )
}

export default MyTable;
