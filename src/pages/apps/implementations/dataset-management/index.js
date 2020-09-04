import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { ReactSortable } from 'react-sortablejs'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import WorkItemModal from '../../../ui-kits/antd/implementations/modal'
import AddItems from '../../../ui-kits/antd/implementations/modalAddItems'
import style from './style.module.scss'

const mapStateToProps = ({ service }) => ({
  dataSets: service.dataSets,
})

const DataSets = ({ dataSets }) => {
  const [data, setData] = useState(dataSets)

  useEffect(() => {
    setData(dataSets)
  }, [dataSets])
  console.log(JSON.stringify(data))

  const agileItems = {
    name: 'Button',
    description: 'To trigger an operation.',
    link: 'https://ant.design/components/button/',
    component: <WorkItemModal datasetId={1} />,
  }

  const buttonAddItems = {
    name: 'Button',
    description: 'To trigger an operation.',
    link: 'https://ant.design/components/button/',
    component: <AddItems datasetId={1} />,
  }

  console.log(data)

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
          <div>{buttonAddItems.component}</div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="card bg-light py-3 px-2">
              <h3 className="font-weight-bold text-dark font-size-18 mb-3">Backlog</h3>
              <ReactSortable
                group="issues"
                style={{ minHeight: 500 }}
                key="id"
                onChange={item => update(item)}
              >
                {Array.isArray(data) && data.length ? (
                  data.map(item => {
                    if (item.datasetcontext.status === 'string') {
                      return (
                        <div className={style.card} key={item.id}>
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
                    }
                    return <div>nothing found</div>
                  })
                ) : (
                  <div>Loading...</div>
                )}
              </ReactSortable>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card bg-light py-3 px-2">
              <h3 className="font-weight-bold text-dark font-size-18 mb-3">To Do</h3>
              <ReactSortable
                group="issues"
                style={{ minHeight: 500 }}
                key="id"
                onChange={item => update(item)}
              >
                {Array.isArray(data) && data.length ? (
                  data.map(item => {
                    console.log(item)
                    if (item.datasetcontext.status === 'string') {
                      return (
                        <div className={style.card} key={item.id}>
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
                    }
                    return <div>nothing found</div>
                  })
                ) : (
                  <div>Loading...</div>
                )}
              </ReactSortable>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card bg-light py-3 px-2">
              <h3 className="font-weight-bold text-dark font-size-18 mb-3">In Progress</h3>
              <ReactSortable
                group="issues"
                style={{ minHeight: 500 }}
                key="id"
                onChange={item => update(item)}
              >
                {Array.isArray(data) && data.length ? (
                  data.map(item => {
                    console.log(item)
                    if (item.datasetcontext.status === 'INPROGRESS') {
                      return (
                        <div className={style.card} key={item.id}>
                          <div className={style.content}>
                            <div className={`${style.flag} bg-primary`} />
                            <div className="d-flex flex-wrap-reverse align-items-center">
                              <h5 className="text-dark font-size-18 mt-2 mr-auto">{item.name}</h5>
                              <h5 className="text-dark font-size-8 mt-2 mr-auto">ID: {item.id}</h5>
                            </div>
                            <div className="text-gray-5 mb-2">Description: {item.description}</div>
                          </div>
                        </div>
                      )
                    }
                    return <div>nothing found</div>
                  })
                ) : (
                  <div>Loading...</div>
                )}
              </ReactSortable>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card bg-light py-3 px-2">
              <h3 className="font-weight-bold text-dark font-size-18 mb-3">Completed</h3>
              <ReactSortable
                group="issues"
                style={{ minHeight: 500 }}
                onChange={item => update(item)}
                key="id"
              >
                {Array.isArray(data) && data.length ? (
                  data.map(item => {
                    console.log(item)
                    if (item.datasetcontext.status === 'COMPLETED') {
                      return (
                        <div className={style.card} key={item.id}>
                          <div className={style.content}>
                            <div className={`${style.flag} bg-primary`} />
                            <div className="d-flex flex-wrap-reverse align-items-center">
                              <h5 className="text-dark font-size-18 mt-2 mr-auto">{item.name}</h5>
                              <h5 className="text-dark font-size-8 mt-2 mr-auto">ID: {item.id}</h5>
                            </div>
                            <div className="text-gray-5 mb-2">Description: {item.description}</div>
                          </div>
                        </div>
                      )
                    }
                    return <div>nothing found</div>
                  })
                ) : (
                  <div>Loading...</div>
                )}
              </ReactSortable>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <div>{componentContent()}</div>
}

export default withRouter(connect(mapStateToProps)(DataSets))
