import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { Table, Input, InputNumber, Popconfirm, Form, Button } from 'antd'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = ({ service }) => ({
  projects: service.projects,
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

const ProjectTableWide = props => {
  const { projects = [] } = props
  const [form] = Form.useForm()
  const [data, setData] = useState(projects)
  const [editingKey, setEditingKey] = useState('')

  const [userInput, setUserInput] = useState(false)

  const isEditing = record => record.id === editingKey

  const edit = record => {
    form.setFieldsValue({
      name: '',
      lead: '',
      ...record,
    })
    setEditingKey(record.id)
  }

  const sessionStorageStoreDataSetId = () => {
    sessionStorage.setItem('datasetId', 1)
    console.log(sessionStorage.getItem('datasetId'))
  }

  const openProject = () => {
    if (userInput === true) {
      console.log('open project')
      sessionStorageStoreDataSetId()
      return (
        <Redirect
          to={{
            pathname: '/apps/dataset-management',
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
      title: 'NAME',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'DESCRIPTION',
      dataIndex: 'description',
      width: '15%',
      editable: true,
    },
    {
      title: 'LEAD',
      dataIndex: 'lead',
      width: '15%',
      editable: true,
    },
    {
      title: 'OPERATION',
      width: '15%',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <a
              href="javascript:"
              onClick={() => save(record.id)}
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
            <Button disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Button>
            <Button onClick={() => setUserInput(true)}>Open</Button>
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

  return (
    <div>
      <div>{openProject()}</div>
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
          pagination={{
            onChange: cancel,
          }}
          style={{ width: '80%' }}
        />
      </Form>
    </div>
  )
}
export default withRouter(connect(mapStateToProps)(ProjectTableWide))
