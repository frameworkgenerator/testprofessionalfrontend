import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { Table, Input, InputNumber, Popconfirm, Form, Button } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = ({ service }) => ({
  fields: service.fields,
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

const TestsTableWide = props => {
  const { fields = [] } = props
  const [form] = Form.useForm()
  const [data, setData] = useState(fields)
  const [editingKey, setEditingKey] = useState('')
  const [getSelectedRowKeys, setSelectedRowKeys] = useState([])
  const [count, setCount] = useState(0)

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

  const cancel = () => {
    setEditingKey('')
  }

  const save = async key => {
    try {
      const row = await form.validateFields()
      const newData = [...data]
      const index = newData.findIndex(item => key === item.key)

      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, { ...item, ...row })
        setData(newData)
        setEditingKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const columns = [
    {
      title: 'OBJECTNAME',
      dataIndex: 'objectname',
      width: '15%',
      editable: true,
    },
    {
      title: 'OBJECTDESCRIPTION',
      dataIndex: 'description',
      width: '15%',
      editable: true,
    },
    {
      title: 'OBJECTACTION',
      dataIndex: 'objectaction',
      width: '15%',
      editable: true,
    },
    {
      title: 'DEFAULTVALUE',
      dataIndex: 'defaultvalue',
      width: '15%',
      editable: true,
    },
    {
      title: 'EXPECTED RESULT',
      dataIndex: 'expectedresult',
      width: '15%',
      editable: true,
    },
    {
      title: 'TESTVALUE',
      dataIndex: 'testvalue',
      width: '15%',
      editable: true,
    },
    {
      title: 'OPERATION',
      dataIndex: 'operation',
      width: '15%',
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
          <Button disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Button>
        )
      },
    },
    {
      title: 'RESULT',
      dataIndex: 'result',
      width: '15%',
      editable: true,
      render: (_, record) => {
        if (record.result === 'PASSED')
          return (
            <span>
              <div title="failed" onConfirm={cancel} style={{ backgroundColor: '#229204' }}>
                <a>{record.result}</a>
              </div>
            </span>
          )
        return (
          <span>
            <div title="failed" onConfirm={cancel} style={{ backgroundColor: '#FF0000' }}>
              <a>{record.result}</a>
            </div>
          </span>
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
      datasetId: 1,
      defaultvalue: `Input ${count}`,
      description: `Input ${count}`,
      expectedresult: `Expected Result`,
      fieldobjectId: 0,
      objectaction: `INPUTID`,
      objectname: `TestObject ${count}`,
      objectselector: 'Selector',
      testStepId: 0,
      testvalue: `TestValue ${count}`,
      result: `PASSED`,
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
export default withRouter(connect(mapStateToProps)(TestsTableWide))
