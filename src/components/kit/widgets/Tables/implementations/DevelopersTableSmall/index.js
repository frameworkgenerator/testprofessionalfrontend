import React from 'react'
import { Table } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import style from './style.module.scss'

const mapStateToProps = ({ service }) => ({
  fields: service.fields,
})

const columns = [
  {
    title: 'OBJECTNAME',
    dataIndex: 'objectname',
    className: 'text-gray-6',
    key: 'product',
    sorter: true,
    render: text => {
      return <div className="font-weight-bold">{text}</div>
    },
  },
  {
    title: 'SELECTOR',
    dataIndex: 'objectselector',
    key: 'quantity',
    className: 'text-right text-gray-6',
    render: text => {
      return <div className="font-weight-bold">{text}</div>
    },
  },
  {
    title: 'ACTION',
    dataIndex: 'objectaction',
    key: 'cost',
    className: 'text-right text-gray-6',
    render: text => {
      return <div className="font-weight-bold">{text}</div>
    },
  },
  {
    title: 'VALUE',
    dataIndex: 'defaultvalue',
    key: 'cost',
    className: 'text-right text-gray-6',
    sorter: true,
    render: text => {
      return <div className="font-weight-bold">{text}</div>
    },
  },
]

const DevelopersTableSmall = props => {
  const { fields = [] } = props

  return (
    <div>
      <div className="mb-4">
        <Table className={style.table} columns={columns} dataSource={fields} pagination={false} />
      </div>
    </div>
  )
}
export default withRouter(connect(mapStateToProps)(DevelopersTableSmall))
