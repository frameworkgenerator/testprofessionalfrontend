import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { Table, Input, InputNumber, Popconfirm, Form, Button } from 'antd'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = ({ service, user, dispatch }) => ({
  projects: service.projects,
  dispatch,
  user,
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

const ProjectTableWide = ({ projects, dispatch, user }) => {
  const [form] = Form.useForm()
  const [data, setData] = useState(projects)
  const [userInput, setUserInput] = useState(false)
  const [editingKey, setEditingKey] = useState('')
  const [getSelectedRowKeys, setSelectedRowKeys] = useState([])
  const [count, setCount] = useState(0)

  const isEditing = record => record.id === editingKey

  const edit = record => {
    form.setFieldsValue({
      name: '',
      description: '',
      lead: '',
      ...record,
    })
    setEditingKey(record.id)
  }

  const onFinish = () => {
    console.log(JSON.stringify(...data))
    dispatch({
      type: 'service/SET_PROJECTS',
      payload: [...data],
    })
  }

  const sessionStorageStoreDataSetId = id => {
    sessionStorage.setItem('projectId', id)
  }

  const openProject = () => {
    if (userInput === true) {
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
        if (row != null) {
          newData.push(newData[newData.length - 1])
        } else {
          newData.push(row)
        }
        setData(newData)
        setEditingKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const columns = [
    {
      title: 'PROJECT',
      dataIndex: 'projectname',
      width: '25%',
      editable: true,
    },
    {
      title: 'DESCRIPTION',
      dataIndex: 'description',
      width: '25%',
      editable: true,
    },
    {
      title: 'LEAD',
      dataIndex: 'lead',
      width: '25%',
      editable: true,
    },
    {
      title: 'OPERATION',
      width: '25%',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <a
              id={`Save_${record.id}`}
              href="javascript:;"
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
            <Button
              id={`Edit_${record.id}`}
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
      description: `Description ${count}`,
      lead: `Lead`,
      projectname: `Name ${count}`,
    }
    setData([...data, newData])
    setCount(count + 1)
  }

  const handleRemove = () => {
    const dataSource = [...data]
    getSelectedRowKeys.forEach(function x(id) {
      setData(dataSource.filter(item => item.id !== id))
    })
  }

  const rowSelection = {
    setSelectedRowKeys,
    onChange: onSelectChange,
  }
  // // const onFinishFailed = errorInfo => {
  // //   console.log('Failed:', errorInfo)
  // // }

  return (
    <div>
      <div className="mb-1">
        <Form layout="horizontal" hideRequiredMark className="mb-1 form-inline">
          <Button
            type="primary"
            onClick={onFinish}
            style={{
              marginBottom: 16,
            }}
            loading={user.loading}
          >
            Save
          </Button>
        </Form>
        <Form layout="horizontal" hideRequiredMark onClick={handleAdd} className="mb-1 form-inline">
          <Button
            type="primary"
            style={{
              marginBottom: 16,
            }}
            loading={user.loading}
          >
            + Add
          </Button>
        </Form>
        <Form
          layout="horizontal"
          hideRequiredMark
          onClick={handleRemove}
          className="mb-1 form-inline"
        >
          <Button
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            - Remove
          </Button>
        </Form>
      </div>
      {openProject()}
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
export default withRouter(connect(mapStateToProps)(ProjectTableWide))
