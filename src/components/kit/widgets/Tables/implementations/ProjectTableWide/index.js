import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { Table, Input, InputNumber, Popconfirm, Form, Button, Tooltip, Space } from 'antd'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { SaveOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'

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
  const [editingKey, setEditingKey] = useState('')
  const [getSelectedRowKeys, setSelectedRowKeys] = useState([])
  const [open, setOpen] = useState(false)
  const [getChildKey, setChildKey] = useState(null)
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
    dispatch({
      type: 'service/SET_PROJECTS',
      payload: [...data],
    })
  }

  const resetApp = () => {
    dispatch({
      type: 'service/RESET_APP',
    })
  }

  const onDelete = () => {
    const removedObjects = []
    getSelectedRowKeys.forEach(function getRowKeys(id) {
      data
        .filter(item => item.id === id)
        .forEach(function y(obj) {
          removedObjects.push(obj)
        })
    })
    dispatch({
      type: 'service/DELETE_PROJECTS',
      payload: removedObjects,
    })
    updateDataBasedOnDeletions(removedObjects)
  }

  const updateDataBasedOnDeletions = removedObjects => {
    console.log('start updating objects')
    const newDataArray = []
    removedObjects.forEach(function getObjectsFromArray(obj) {
      data
        .filter(item => item.id !== obj.id)
        .forEach(function selectObjects(selectedObjectForRemoving) {
          newDataArray.push(selectedObjectForRemoving)
        })
    })
    setData(newDataArray)
  }

  const sessionStorageStoreDataSetId = id => {
    console.log('isEditing')
    console.log(id)
    console.log(getChildKey)
    sessionStorage.setItem('dataSetId', getChildKey)
  }

  const openProject = () => {
    if (open) {
      sessionStorageStoreDataSetId(getChildKey)
      return (
        <Redirect
          to={{
            pathname: '/apps/dataset-management',
            state: { id: getChildKey },
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
                setOpen(true)
                setChildKey(record.id)
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
    const collectLatestId = [...data]
    const saveIdToArray = []
    collectLatestId.forEach(function iterateOverDataObjects(obj) {
      saveIdToArray.push(obj.id)
    })
    const getHighestIdPlusOne = Math.max(...saveIdToArray) + 1
    const createNewObject = {
      id: getHighestIdPlusOne,
      description: `Description ${count}`,
      lead: `Lead`,
      projectname: `Name ${count}`,
    }
    setData([...data, createNewObject])
    setCount(count + 1)
  }

  const rowSelection = {
    setSelectedRowKeys,
    onChange: onSelectChange,
  }

  return (
    <div>
      <div className="mb-1">
        <Form layout="horizontal" hideRequiredMark className="mb-1 form-inline">
          <div className="site-button-ghost-wrapper">
            <Space>
              <Button
                type="primary"
                shape="block"
                onClick={resetApp}
                loading={user.loading}
                icon={<SaveOutlined />}
              />
              <Tooltip title="save">
                <Button
                  type="primary"
                  shape="block"
                  onClick={onFinish}
                  loading={user.loading}
                  icon={<SaveOutlined />}
                />
              </Tooltip>
              <Tooltip title="add row">
                <Button
                  type="primary"
                  shape="block"
                  onClick={handleAdd}
                  loading={user.loading}
                  icon={<PlusOutlined />}
                />
              </Tooltip>
              <Tooltip title="remove row">
                <Button
                  type="primary"
                  shape="block"
                  onClick={onDelete}
                  loading={user.loading}
                  icon={<DeleteOutlined />}
                />
              </Tooltip>
            </Space>
            <br />
            <br />
          </div>
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
