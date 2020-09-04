import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { Table, Input, InputNumber, Popconfirm, Form, Button } from 'antd'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = ({ service }) => ({
  testSets: service.testSets,
})

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

const TestSetTableWide = props => {
  const { testSets = [] } = props
  const [form] = Form.useForm()
  const [data, setData] = useState(testSets)
  const [editingKey, setEditingKey] = useState('')
  const [getSelectedRowKeys, setSelectedRowKeys] = useState([])
  const [count, setCount] = useState(0)
  const [userInput, setUserInput] = useState(false)

  const isEditing = record => record.key === editingKey

  const edit = record => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    })
    setEditingKey(record.key)
  }

  const sessionStorageStoreDataSetId = key => {
    sessionStorage.setItem('projectId', key)
  }

  const open = () => {
    if (userInput === true) {
      return (
        <Redirect
          to={{
            pathname: '/apps/testCase-management',
            state: { datasetId: '123' },
          }}
        />
      )
    }
    return false
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async id => {
    try {
      const row = await form.validateFields()
      const newData = [...data]
      const index = newData.findIndex(item => id === item.id)

      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, { ...item, ...row })
        setData(newData)
        setEditingKey('')
      } else {
        newData.push(row)
        setData(newData)
        setEditingKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const columns = [
    {
      title: 'TESTSETNAME',
      dataIndex: 'testsetname',
      width: '15%',
      editable: true,
    },
    {
      title: 'DESCRIPTION',
      dataIndex: 'description',
      width: '15%',
      editable: true,
    },
    {
      title: 'OPERATION',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <div>
            <Button
              id={`Edit_${record.key}`}
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                setUserInput(true)
                sessionStorageStoreDataSetId(record.id)
              }}
            >
              Open
            </Button>
          </div>
        )
      },
    },
  ]
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })
  const onSelectChange = selected => {
    console.log('selectedRowKeys changed: ', selected)
    const newData = [...getSelectedRowKeys, ...selected]
    setSelectedRowKeys(newData)
  }

  const handleAdd = () => {
    const newData = {
      key: count,
      id: count,
      description: `Description ${count}`,
      projectId: 0,
      requirementId: 0,
      storyId: 0,
      testplanId: 0,
      testsetname: `TestSet Name ${count}`,
    }
    setData([...data, newData])
    setCount(count + 1)
  }

  const handleRemove = () => {
    const dataSource = [...data]
    getSelectedRowKeys.forEach(function x(key) {
      setData(dataSource.filter(item => item.key !== key))
    })
  }

  const rowSelection = {
    setSelectedRowKeys,
    onChange: onSelectChange,
  }

  return (
    <div>
      {open()}
      <div className="mb-1">
        <Button
          onClick={handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          + Add
        </Button>
        &nbsp;
        <Button
          onClick={handleRemove}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          - Remove
        </Button>
      </div>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          rowKey="id"
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          rowSelection={rowSelection}
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  )
}
export default withRouter(connect(mapStateToProps)(TestSetTableWide))
