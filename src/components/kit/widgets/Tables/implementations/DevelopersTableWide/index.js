import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import { Table, Input, InputNumber, Popconfirm, Form, Button, Select } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const { Option } = Select

const mapStateToProps = ({ service }) => ({
  fields: service.fields,
  dropDown: service.dropDown,
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

const DevelopersTableWide = props => {
  const { fields = [], dropDown = [] } = props
  const [form] = Form.useForm()
  const [data, setData] = useState(fields)
  const [action] = useState(dropDown)
  const [editingKey, setEditingKey] = useState('')
  const [getSelectedRowKeys, setSelectedRowKeys] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    setData(fields)
  }, [fields])
  console.log(data)

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
      title: 'OBJECTSELECTOR',
      dataIndex: 'objectselector',
      width: '15%',
      editable: true,
    },
    {
      title: 'OBJECTACTION',
      dataIndex: 'objectaction',
      width: '15%',
      editable: true,
      render: text => {
        return (
          <Select defaultValue={text}>
            {action.map((obj, index) => (
              <Option value={obj} key={index.toString()}>
                {obj}
              </Option>
            ))}
          </Select>
        )
      },
    },
    {
      title: 'DEFAULTVALUE',
      dataIndex: 'defaultvalue',
      width: '15%',
      editable: true,
    },
    {
      title: 'VALUELENGTH',
      dataIndex: 'valuelength',
      width: '15%',
      editable: true,
    },
    {
      title: 'VALUERANGE',
      dataIndex: 'valuerange',
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
      objectname: `Input ${count}`,
      objectselector: `Input`,
      objectaction: `INPUTID`,
      defaultvalue: `Input`,
      valuelength: `255`,
      valuerange: `0-99`,
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
export default withRouter(connect(mapStateToProps)(DevelopersTableWide))
