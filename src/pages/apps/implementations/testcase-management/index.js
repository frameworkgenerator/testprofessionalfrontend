import React, { useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import PerfectScrollbar from 'react-perfect-scrollbar'
import SortableTree, { changeNodeAtPath } from 'react-sortable-tree'
import { SearchOutlined } from '@ant-design/icons'
import { Input, Tooltip, Checkbox, Select, Button } from 'antd'
import Table6 from 'components/kit/widgets/Tables/6'
import style from './style.module.scss'

const mapStateToProps = ({ service }) => ({
  tests: service.tests,
  testSteps: service.testSteps,
})

const AppsTestcaseManagement = props => {
  const { tests = [], testSteps = [] } = props
  const [testData] = useState(tests)
  const [testStepData] = useState(testSteps)

  const taskInput = React.createRef()

  const testDataToNameValue = testData.map(number => {
    return { name: number.objectname }
  })

  const treeDataDefault = testStepData.map(number => {
    return { name: number.teststepname, expanded: true, children: testDataToNameValue }
  })

  const [treeData, setTreeData] = useState(treeDataDefault)
  const [hideInput, setHideInput] = useState(true)
  const { Option } = Select

  const toggleInput = () => {
    setHideInput(!hideInput)
  }

  const addTask = e => {
    const task = e.target.value

    if (e.which === 13 && task !== '') {
      const treeDataProcessed = treeData.concat({
        name: task,
      })

      setTreeData(treeDataProcessed)
      taskInput.current.value = ''
    }
  }

  const getNodeKey = ({ treeIndex }) => treeIndex

  const history = useHistory()

  const [availableTestObjects] = useState(
    tests.map(item => {
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

  return (
    <div>
      <Helmet title="Testcase management" />
      {openProject}
      <div className="row">
        <div className="col-12 col-md-3">
          <div className="mb-4">
            <Input
              prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Search mail..."
            />
          </div>
          <div className={style.categories}>
            <div className="d-flex flex-column">
              <div
                className={` ${style.category} ${style.title} text-dark font-size-18 font-weight-bold`}
              >
                <span className="text-truncate">Available Testobjects</span>
              </div>
              {availableTestObjects}
              <Button className="text-truncate">New</Button>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="card">
            <div className="card-header card-header-flex align-items-center">
              <div className="d-flex flex-column justify-content-center mr-auto">
                <h5 className="mb-0">Welcome</h5>
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
              <h6 className="text-uppercase text-dark font-size-18 font-weight-bold mb-2">
                Testcase management
              </h6>
              <p className="mb-3">Welcome to testcasemanagement</p>
              <div>
                <Select placeholder="Select a option and change the tree data bellow">
                  <Option value="male">DataSet 1</Option>
                  <Option value="female">DataSet 2</Option>
                </Select>
              </div>
              <div className="height-400">
                <PerfectScrollbar>
                  <div className="height-400">
                    <SortableTree
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
                </PerfectScrollbar>
              </div>
              <br />
              <button
                type="button"
                className="btn btn-primary btn-with-addon text-nowrap"
                onClick={toggleInput}
              >
                <span className="btn-addon">
                  <i className="btn-addon-icon fe fe-plus-circle" />
                </span>
                Add Step
              </button>
              <input
                hidden={hideInput}
                className="form-control mt-3"
                placeholder="Add step here and press enter..."
                type="text"
                onKeyPress={e => addTask(e)}
                ref={taskInput}
              />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <Table6 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(connect(mapStateToProps)(AppsTestcaseManagement))
