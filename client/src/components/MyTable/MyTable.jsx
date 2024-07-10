import React from 'react';
import DataTable from 'react-data-table-component';
import useWindowSize from '../../Hooks/useWindowsSize';
import './myTable.css';

const MyTable = ({ columns, data }) => {
    const { width } = useWindowSize();
    return (
        <DataTable
            columns={columns}
            data={data}
            direction="auto"
            fixedHeader
            fixedHeaderScrollHeight={width > 1024 ? '600px' : '500px'}
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
