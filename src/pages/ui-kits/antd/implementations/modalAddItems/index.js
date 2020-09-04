/* eslint-disable */
import React from 'react'
import { Modal, Form, Input, Button, Select } from 'antd'
import { Redirect } from 'react-router-dom'

const { confirm } = Modal

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
}

const { Option } = Select

const onFinish = values => {
  console.log(values)
}

const onBlockedChange = value => {
  console.log(value)
}

class WorkItemModal extends React.Component {
  state = { visible: false, redirect: false }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  enableRoute = () => {
    this.setState({
      redirect: true,
    })
  }

  openWorkItem = () => {
    if (this.state.redirect === true) {
      this.sessionStorageStoreDataSetId()
      return (
        <Redirect
          to={{
            pathname: '/apps/fields-management',
            state: { datasetId: '123' },
          }}
        />
      )
    }
  }

  handleOk = () => {
    this.setState({
      visible: false,
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this task?',
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK')
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  sessionStorageStoreDataSetId = () => {
    console.log('was here')
    sessionStorage.setItem('datasetId', 1)
    console.log(sessionStorage.getItem('datasetId'))
  }

  render() {
    return (
      <div>
        {this.openWorkItem()}
        <div className="mb-1">
          <Button type="primary" onClick={this.showModal} className="mb-1 mr-1">
            Open
          </Button>
          <Button onClick={this.showDeleteConfirm} type="dashed" className="mb-1 mr-1">
            Delete
          </Button>
        </div>
        <Modal
          title={'Workitem ' + this.props.datasetId}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={['dataset', 'name']}
              label="Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name={'description'} label="description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name={['datasetcontext', 'owner']}
              label="Owner"
              rules={[
                {
                  required: 'owner',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['datasetcontext', 'status']}
              label="Status"
              rules={[
                {
                  required: 'status',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select a option and change input text above"
                onChange={onBlockedChange()}
                allowClear
              >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default WorkItemModal
