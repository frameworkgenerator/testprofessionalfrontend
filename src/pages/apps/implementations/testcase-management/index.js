import React, { useEffect, useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import PerfectScrollbar from 'react-perfect-scrollbar'
import SortableTree, { changeNodeAtPath } from 'react-sortable-tree'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import { Tooltip, Checkbox, Button, Transfer, Modal, Menu, Dropdown } from 'antd'
import style from './style.module.scss'

const mapStateToProps = ({ service }) => ({
  tests: service.tests,
  testSteps: service.testSteps,
  testCases: service.testCases,
})

const AppsTestcaseManagement = ({ tests, testSteps, testCases }) => {
  const [getTests, setTests] = useState(tests)
  const [getTestSteps, setTestSteps] = useState(testSteps)
  const [getTestCases, setTestCases] = useState(testCases)

  useEffect(() => {
    setTests(getTests)
  }, [getTests])
  console.log(getTests)
  useEffect(() => {
    setTestSteps(getTestSteps)
  }, [getTestSteps])
  console.log(getTestSteps)
  useEffect(() => {
    setTestCases(getTestCases)
  }, [getTestCases])
  console.log(getTestCases)

  const [count, setCount] = useState(0)
  const [, setMockData] = useState([])
  const [targetKeys, setTargetKeys] = useState([])
  const [visible, setVisible] = useState(false)

  const taskInput = React.createRef()

  const testDataToNameValue = getTests.map(number => {
    return { name: number.objectname }
  })

  const treeDataDefault = getTestSteps.map(number => {
    return { name: number.testcasename, expanded: true, children: number.teststep }
  })

  const [treeData, setTreeData] = useState(treeDataDefault)
  const [hideInput, setHideInput] = useState(true)

  const toggleInput = () => {
    setHideInput(!hideInput)
  }

  const addTask = e => {
    const task = e.target.value
    const newData = {
      key: count,
      id: count,
      teststepname: task,
      description: `Description`,
      position: 0,
      requirement: 0,
      testcaseId: 0,
      testsetId: 0,
      children: testDataToNameValue,
    }
    setTestSteps([...testSteps, newData])
    setCount(count + 1)

    if (e.which === 13 && task !== '') {
      const treeDataProcessed = treeData.concat({
        name: task,
        expanded: true,
        children: testDataToNameValue,
      })

      setTreeData(treeDataProcessed)
      taskInput.current.value = ''
    }
    const data = {
      key: 1,
      title: `content`,
      description: `description`,
      chosen: 1,
    }
    setMockData([data])
  }

  const getNodeKey = ({ treeIndex }) => treeIndex

  const history = useHistory()

  const [availableTestObjects] = useState(
    getTests.map(item => {
      return (
        <Button
          onClick={e => {
            openProject(e)
          }}
          className={`${style.category} text-dark font-size-18`}
        >
          <span className="text-truncate">{item.objectname}</span>
        </Button>
      )
    }),
  )

  const openProject = e => {
    e.preventDefault()
    history.push('/apps/tests-management')
  }

  const filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1

  const handleChange = item => {
    setTargetKeys(item)
  }

  const handleSearch = (dir, value) => {
    console.log('search:', dir, value)
  }

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = e => {
    console.log(e)
    setVisible(false)
  }

  const handleCancelModal = e => {
    console.log(e)
    setVisible(false)
  }

  const handleMenuClick = e => {
    showModal()
    console.log(e)
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        TestStep A
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        TestStep B
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        TestStep C
      </Menu.Item>
    </Menu>
  )

  return (
    <div>
      <Helmet title="Testcase management" />
      {openProject}
      <div className="row">
        <div className="col-12 col-md-3">
          <div className="mb-4" />
          <div className={style.categories}>
            <div className="d-flex flex-column">
              <div
                className={` ${style.category} ${style.title} text-dark font-size-18 font-weight-bold `}
              >
                <span className="text-truncate">Add TestObjects</span>
                <div>
                  <Dropdown overlay={menu} className={`${style.category} text-dark font-size-18`}>
                    <Button>
                      Select TestStep <DownOutlined />
                    </Button>
                  </Dropdown>
                  <Modal
                    title="Add TestObjects To TestStep"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancelModal}
                  >
                    <Transfer
                      dataSource={getTestCases}
                      showSearch
                      filterOption={filterOption}
                      targetKeys={targetKeys}
                      onChange={handleChange}
                      onSearch={handleSearch}
                      render={item => item.objectname}
                    />
                  </Modal>
                </div>
                <br />
                <span className="text-truncate">Add FieldObjects</span>
                <br />
                {availableTestObjects}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="card">
            <div className="card-header card-header-flex align-items-center">
              <div className="d-flex flex-column justify-content-center mr-auto">
                <h5 className="mb-0">TestCase Management</h5>
              </div>
              <div>
                <Tooltip placement="top" title="Unlock Account">
                  <a
                    href="#"
                    onClick={e => e.preventDefault()}
                    className="btn btn-sm btn-light mr-2"
                  >
                    <i className="fe fe-unlock" />
                  </a>
                </Tooltip>
                <Tooltip placement="top" title="Mark as important">
                  <a
                    href="#"
                    onClick={e => e.preventDefault()}
                    className="btn btn-sm btn-light mr-2"
                  >
                    <i className="fe fe-star" />
                  </a>
                </Tooltip>
                <Tooltip placement="top" title="Delete user">
                  <a href="#" onClick={e => e.preventDefault()} className="btn btn-sm btn-light">
                    <i className="fe fe-trash" />
                  </a>
                </Tooltip>
              </div>
            </div>
            <div className="card-body">
              <p className="mb-3">Welcome to testcasemanagement</p>
              <div className="height-400">
                <PerfectScrollbar>
                  <div className="height-400">
                    <button
                      type="button"
                      className="btn btn-primary btn-with-addon text-nowrap"
                      onClick={toggleInput}
                    >
                      <span className="btn-addon">
                        <i className="btn-addon-icon fe fe-plus-circle" />
                      </span>
                      + Add
                    </button>
                    <input
                      hidden={hideInput}
                      className="form-control mt-3"
                      placeholder="Add step here and press enter..."
                      type="text"
                      onKeyPress={e => addTask(e)}
                      ref={taskInput}
                    />
                    <br />
                    <SortableTree
                      rowKey="id"
                      treeData={treeData}
                      onChange={tree => setTreeData(tree)}
                      generateNodeProps={({ node, path }) => ({
                        title: !node.children ? (
                          <Checkbox
                            checked={node.checked}
                            onChange={event => {
                              const { checked } = event.target
                              setTreeData(
                                changeNodeAtPath({
                                  treeData,
                                  path,
                                  getNodeKey,
                                  newNode: { ...node, checked },
                                }),
                              )
                            }}
                          >
                            {node.name}
                          </Checkbox>
                        ) : (
                          <span>{node.name}:</span>
                        ),
                      })}
                    />
                  </div>
                  <br />
                </PerfectScrollbar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(connect(mapStateToProps)(AppsTestcaseManagement))
