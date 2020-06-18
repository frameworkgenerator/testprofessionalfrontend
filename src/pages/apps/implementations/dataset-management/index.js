import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { ReactSortable } from 'react-sortablejs'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from 'antd'
import style from './style.module.scss'
import WorkItemModal from '../../../ui-kits/antd/implementations/modal'

const mapStateToProps = ({ service }) => ({
  dataSets: service.dataSets,
})

const ExtraAppsJiraAgileBoard = props => {
  const { dataSets = [] } = props
  const [data, updateData] = React.useState(dataSets)

  const agileItems = {
    name: 'Button',
    description: 'To trigger an operation.',
    link: 'https://ant.design/components/button/',
    component: <WorkItemModal datasetId={1} />,
  }

  const add = () => {
    const newData = [...data]
    const row = data[data.length - 1]
    row.datasetcontext.status = 'Backlog'
    row.id = 4
    newData.push(row)
    updateData(newData)
    console.log(JSON.stringify(data))
  }

  const [backlogItems, setBacklogItems] = useState(
    data
      .filter(item => item.datasetcontext.status === 'Backlog')
      .map(item => {
        return (
          <div className={style.card} key={item.id.toString()}>
            <div className={style.content}>
              <div className={`${style.flag} bg-primary`} />
              <div className="d-flex flex-wrap-reverse align-items-center">
                <h5 className="text-dark font-size-18 mt-2 mr-auto">{item.name}</h5>
                <h5 className="text-dark font-size-8 mt-2 mr-auto">ID: {item.id}</h5>
              </div>
              <div className="text-gray-5 mb-2">Description: {item.description}</div>
              <div>{agileItems.component}</div>
            </div>
          </div>
        )
      }),
  )

  const [todoItems, setTodoItems] = useState(
    data
      .filter(item => item.datasetcontext.status === 'ToDo')
      .map(item => {
        return (
          <div className={style.card} key={item.id.toString()}>
            <div className={style.content}>
              <div className={`${style.flag} bg-primary`} />
              <div className="d-flex flex-wrap-reverse align-items-center">
                <h5 className="text-dark font-size-18 mt-2 mr-auto">{item.name}</h5>
                <h5 className="text-dark font-size-8 mt-2 mr-auto">ID: {item.id}</h5>
              </div>
              <div className="text-gray-5 mb-2">Description: {item.description}</div>
              <div>{agileItems.component}</div>
            </div>
          </div>
        )
      }),
  )

  const [inprogressItems, setInprogressItems] = useState(
    data
      .filter(item => item.datasetcontext.status === 'InProgress')
      .map(item => {
        return (
          <div className={style.card} key={item.id.toString()}>
            <div className={style.content}>
              <div className={`${style.flag} bg-primary`} />
              <div className="d-flex flex-wrap-reverse align-items-center">
                <h5 className="text-dark font-size-18 mt-2 mr-auto">{item.name}</h5>
                <h5 className="text-dark font-size-8 mt-2 mr-auto">ID: {item.id}</h5>
              </div>
              <div className="text-gray-5 mb-2">Description: {item.description}</div>
              <div>{agileItems.component}</div>
            </div>
          </div>
        )
      }),
  )

  const [completed, setCompleted] = useState(
    data
      .filter(item => item.datasetcontext.status === 'Done')
      .map(item => {
        return (
          <div className={style.card} key={item.id.toString()}>
            <div className={style.content}>
              <div className={`${style.flag} bg-primary`} />
              <div className="d-flex flex-wrap-reverse align-items-center">
                <h5 className="text-dark font-size-18 mt-2 mr-auto">{item.name}</h5>
                <h5 className="text-dark font-size-8 mt-2 mr-auto">ID: {item.id}</h5>
              </div>
              <div className="text-gray-5 mb-2">Description: {item.description}</div>
              <div>{agileItems.component}</div>
            </div>
          </div>
        )
      }),
  )

  const update = async event => {
    const getIdFromTitle = event.item.innerText.split('ID: ')[1].split('Description')[0]
    console.log(getIdFromTitle)
  }

  const componentContent = () => {
    return (
      <div>
        <Helmet title="Jira Agile Board" />
        <div className="d-flex align-items-center mb-4">
          <div className="kit__utils__avatarGroup mr-4 flex-shrink-0" />
          <Button onClick={() => add()} type="primary" className="mb-1 mr-1">
            + Add
          </Button>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="card bg-light py-3 px-2">
              <h3 className="font-weight-bold text-dark font-size-18 mb-3">Backlog</h3>
              <ReactSortable
                group="issues"
                style={{ minHeight: 500 }}
                list={backlogItems}
                setList={setBacklogItems}
                key="id"
                onChange={item => update(item)}
              >
                {backlogItems.map(item => item)}
              </ReactSortable>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card bg-light py-3 px-2">
              <h3 className="font-weight-bold text-dark font-size-18 mb-3">To Do</h3>
              <ReactSortable
                group="issues"
                style={{ minHeight: 500 }}
                list={todoItems}
                setList={setTodoItems}
                key="id"
                onChange={item => update(item)}
              >
                {todoItems.map(item => item)}
              </ReactSortable>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card bg-light py-3 px-2">
              <h3 className="font-weight-bold text-dark font-size-18 mb-3">In Progress</h3>
              <ReactSortable
                group="issues"
                style={{ minHeight: 500 }}
                list={inprogressItems}
                setList={setInprogressItems}
                key="id"
                onChange={item => update(item)}
              >
                {inprogressItems.map(item => item)}
              </ReactSortable>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card bg-light py-3 px-2">
              <h3 className="font-weight-bold text-dark font-size-18 mb-3">Completed</h3>
              <ReactSortable
                group="issues"
                style={{ minHeight: 500 }}
                list={completed}
                setList={setCompleted}
                onChange={item => update(item)}
                key="id"
              >
                {completed.map(item => item)}
              </ReactSortable>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <div>{componentContent()}</div>
}

export default withRouter(connect(mapStateToProps)(ExtraAppsJiraAgileBoard))
