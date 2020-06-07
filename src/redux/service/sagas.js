import { call, put, all } from 'redux-saga/effects'
import getFieldData from 'services/spring.boot.service.fields'
import getDropDownData from 'services/spring.boot.service.dropdown'
import getProjectData from 'services/spring.boot.service.projects'
import getDataSetData from 'services/spring.boot.service.datasets'

export function* GET_FIELDS() {
  const fields = yield call(getFieldData)
  yield put({
    type: 'service/GET_FIELDS',
    payload: {
      fields,
    },
  })
}
export function* GET_DROPDOWN() {
  const dropDown = yield call(getDropDownData)
  yield put({
    type: 'service/GET_DROPDOWN',
    payload: {
      dropDown,
    },
  })
}

export function* GET_DATASETS() {
  const dataSets = yield call(getDataSetData)
  yield put({
    type: 'service/GET_PROJECTS',
    payload: {
      dataSets,
    },
  })
}

export function* GET_PROJECTS() {
  const projects = yield call(getProjectData)
  yield put({
    type: 'service/GET_PROJECTS',
    payload: {
      projects,
    },
  })
}

export default function* rootSaga() {
  yield all([
    GET_DATASETS(),
    GET_FIELDS(), // run once on app load to fetch menu data
    GET_DROPDOWN(),
    GET_PROJECTS(),
  ])
}
