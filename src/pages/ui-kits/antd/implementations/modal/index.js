/* eslint-disable */
import React from 'react'
import { Modal, Button } from 'antd'
import DevelopersTableSmall from '../../../../../components/kit/widgets/Tables/implementations/DevelopersTableSmall'
import { Redirect } from 'react-router-dom'

const { confirm } = Modal

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
          <Button type="primary" onClick={this.enableRoute} className="mb-3 mr-3">
            Edit
          </Button>
          <div>
            <DevelopersTableSmall datasetId={this.props.datasetId} />
          </div>
        </Modal>
      </div>
    )
  }
}

export default WorkItemModal
