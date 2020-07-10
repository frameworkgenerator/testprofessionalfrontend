import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { ReactSortable } from 'react-sortablejs'
import getDataFromAPIS from '../../../../services/spring.boot.service.datasets'
import style from './style.module.scss'
import WorkItemModal from '../../../ui-kits/antd/implementations/modal'

const mapStateToProps = ({ dispatch }) => ({
  dispatch,
})

const useFetch = id => {
  const [toDoItems, setToDoItems] = useState([])
  const [blItems, setBlItems] = useState([])
  const getDataFromAPI = async () => {
    try {
      const result = await getDataFromAPIS(id)
      const bg = result.filter(function a(e) {
        return e.datasetcontext.status === 'BACKLOG'
      })
      const td = result.filter(function b(e) {
        return e.datasetcontext.status === 'TODO'
      })
      setToDoItems([...td])
      setBlItems([...bg])
    } catch (e) {
      console.log('shit!')
      console.log(e)
    }
  }
  useEffect(() => {
    getDataFromAPI()
  }, [id])
  return { blItems, toDoItems }
}

const ExtraAppsJiraAgileBoard = () => {
  const id = sessionStorage.getItem('dataSetId')
  const apiEndPoint = id
  const userFetchResponse = useFetch(apiEndPoint)

  // const [data,setData] = useState([])

  // useEffect(() => {
  //   async function fetchData() {
  //     return getDataFromAPI(sessionStorage.getItem('dataSetId'))
  //   }
  //   fetchData().then(r => setData(r));
  // }, [sessionStorage.getItem('dataSetId')]); // Or [] if effect doesn't need props or state
  // console.log(data)
  //
  const agileItems = {
    name: 'Button',
    description: 'To trigger an operation.',
    link: 'https://ant.design/components/button/',
    component: <WorkItemModal datasetId={1} />,
  }

  const update = async event => {
    const getIdFromTitle = event.item.innerText.split('ID: ')[1].split('Description')[0]
    console.log(getIdFromTitle)
  }

  const [backlogItems, setBacklogItems] = useState(
    userFetchResponse.blItems
      .filter(item => item.datasetcontext.status === 'BACKLOG')
      .map(item => {
        console.log(item.length)
        return (
          <div className={style.card} key={item.id.toString()}>
            <div className={style.content}>
              <div className={`${style.flag} bg-primary`} />
              <div className="d-flex flex-wrap-reverse align-items-center">
                <h5 className="text-dark font-size-18 mt-2 mr-auto">{item.description}</h5>
                <h5 className="text-dark font-size-8 mt-2 mr-auto">ID: {item.description}</h5>
              </div>
              <div className="text-gray-5 mb-2">Description: {item.description}</div>
              <div>{agileItems.component}</div>
            </div>
          </div>
        )
      }),
  )

  // const [todoItems, setTodoItems] = useState(
  //   data.filter(item => item.datasetcontext.status === 'ToDo')
  //     .map(item => {
  //       return (
  //         <div className={style.card} key={item.id.toString()}>
  //           <div className={style.content}>
  //             <div className={`${style.flag} bg-primary`} />
  //             <div className="d-flex flex-wrap-reverse align-items-center">
  //               <h5 className="text-dark font-size-18 mt-2 mr-auto">{item.name}</h5>
  //               <h5 className="text-dark font-size-8 mt-2 mr-auto">ID: {item.id}</h5>
  //             </div>
  //             <div className="text-gray-5 mb-2">Description: {item.description}</div>
  //             <div>{agileItems.component}</div>
  //           </div>
  //         </div>
  //       )
  //     }),
  // )
  //
  // const [inprogressItems, setInprogressItems] = useState(
  //   data.filter(item => item.datasetcontext.status === 'InProgress')
  //     .map(item => {
  //       return (
  //         <div className={style.card} key={item.id.toString()}>
  //           <div className={style.content}>
  //             <div className={`${style.flag} bg-primary`} />
  //             <div className="d-flex flex-wrap-reverse align-items-center">
  //               <h5 className="text-dark font-size-18 mt-2 mr-auto">{item.name}</h5>
  //               <h5 className="text-dark font-size-8 mt-2 mr-auto">ID: {item.id}</h5>
  //             </div>
  //             <div className="text-gray-5 mb-2">Description: {item.description}</div>
  //             <div>{agileItems.component}</div>
  //           </div>
  //         </div>
  //       )
  //     }),
  // )
  //
  // const [completed, setCompleted] = useState(
  //   data.filter(item => item.datasetcontext.status === 'Done')
  //     .map(item => {
  //       return (
  //         <div className={style.card} key={item.id.toString()}>
  //           <div className={style.content}>
  //             <div className={`${style.flag} bg-primary`} />
  //             <div className="d-flex flex-wrap-reverse align-items-center">
  //               <h5 className="text-dark font-size-18 mt-2 mr-auto">{item.name}</h5>
  //               <h5 className="text-dark font-size-8 mt-2 mr-auto">ID: {item.id}</h5>
  //             </div>
  //             <div className="text-gray-5 mb-2">Description: {item.description}</div>
  //             <div>{agileItems.component}</div>
  //           </div>
  //         </div>
  //       )
  //     }),
  // )

  const componentContent = () => {
    return userFetchResponse.blItems.length ? (
      <div>
        <Helmet title="Jira Agile Board" />
        <div className="d-flex align-items-center mb-4">
          <div className="kit__utils__avatarGroup mr-4 flex-shrink-0" />
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
        </div>
      </div>
    ) : (
      <span>Loading wells...</span>
    )
  }
  return <div>{componentContent()}</div>
}

export default withRouter(connect(mapStateToProps)(ExtraAppsJiraAgileBoard))
