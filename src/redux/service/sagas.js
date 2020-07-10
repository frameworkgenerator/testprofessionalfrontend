import { call, put, all, takeLeading } from 'redux-saga/effects'
import { notification } from 'antd'
import getFieldData from 'services/spring.boot.service.fields'
import getDropDownData from 'services/spring.boot.service.dropdown'
import getProjectData from 'services/spring.boot.service.projects'
import deleteProjectData from 'services/spring.boot.service.deleteProjects'
import setProjectData from 'services/spring.boot.service.setProjects'
import getTestPlans from '../../services/spring.boot.service.testplans'
import getTestSets from '../../services/spring.boot.service.testsets'
import getTestCases from '../../services/spring.boot.service.testcases'
import getTestSteps from '../../services/spring.boot.service.teststeps'
import getTests from '../../services/spring.boot.service.tests'
import actions from './actions'

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

export function* RESET_APP() {
  yield put({
    type: 'service/RESET_APP',
  })
}

export function* GET_PROJECTS() {
  const projects = yield call(getProjectData)
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  if (projects) {
    yield put({
      type: 'service/GET_PROJECTS',
      payload: {
        projects,
      },
    })
  }
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* DELETE_PROJECTS(action) {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  console.log(JSON.stringify(action.payload))
  yield call(deleteProjectData, action.payload)
  yield put({
    type: 'service/DELETE_PROJECTS',
  })
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* SET_PROJECTS(action) {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  console.log('setting payload...')
  console.log(JSON.stringify(action.payload))
  const success = yield call(setProjectData, action.payload)
  yield put({
    type: 'service/SET_PROJECTS',
  })
  if (success) {
    notification.success({
      message: `Data loaded`,
      description: `${JSON.stringify(action.payload)}`,
    })
  } else {
    notification.error({
      message: `Data Failed`,
      description: `sorry`,
    })
  }
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* GET_TESTPLANS() {
  const testPlans = yield call(getTestPlans)
  yield put({
    type: 'service/GET_TESTPLANS',
    payload: {
      testPlans,
    },
  })
}

export function* GET_TESTSETS() {
  const testSets = yield call(getTestSets)
  yield put({
    type: 'service/GET_TESTSETS',
    payload: {
      testSets,
    },
  })
}

export function* GET_TESTCASES() {
  const testCases = yield call(getTestCases)
  yield put({
    type: 'service/GET_TESTCASES',
    payload: {
      testCases,
    },
  })
}

export function* GET_TESTSTEPS() {
  const testSteps = yield call(getTestSteps)
  yield put({
    type: 'service/GET_TESTSTEPS',
    payload: {
      testSteps,
    },
  })
}

export function* GET_TESTS() {
  const tests = yield call(getTests)
  yield put({
    type: 'service/GET_TESTS',
    payload: {
      tests,
    },
  })
}

export default function* rootSaga() {
  yield all([
    GET_FIELDS(), // run once on app load to fetch menu data
    GET_DROPDOWN(),
    GET_PROJECTS(),
    GET_TESTPLANS(),
    GET_TESTSETS(),
    GET_TESTCASES(),
    GET_TESTSTEPS(),
    GET_TESTS(),
    takeLeading(actions.RESET_APP, RESET_APP()),
    takeLeading(actions.DELETE_PROJECTS, DELETE_PROJECTS()),
    takeLeading(actions.SET_PROJECTS, SET_PROJECTS()),
  ])
}
