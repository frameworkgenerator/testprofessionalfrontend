import { call, put, all } from 'redux-saga/effects'
import getFieldData from 'services/spring.boot.service.fields'
import getDropDownData from 'services/spring.boot.service.dropdown'
import getProjectData from 'services/spring.boot.service.projects'
import getDataSetData from 'services/spring.boot.service.datasets'
import getTestPlans from '../../services/spring.boot.service.testplans'
import getTestSets from '../../services/spring.boot.service.testsets'
import getTestCases from '../../services/spring.boot.service.testcases'
import getTestSteps from '../../services/spring.boot.service.teststeps'
import getTests from '../../services/spring.boot.service.tests'

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
    GET_DATASETS(),
    GET_FIELDS(), // run once on app load to fetch menu data
    GET_DROPDOWN(),
    GET_PROJECTS(),
    GET_TESTPLANS(),
    GET_TESTSETS(),
    GET_TESTCASES(),
    GET_TESTSTEPS(),
    GET_TESTS(),
  ])
}
