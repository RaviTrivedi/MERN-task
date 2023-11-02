"use client"

import { Table } from 'antd'

const TableComponent = ({ dataSource, columns }) => {
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} pagination={false} />;
        </div>
    )
}

export default TableComponent