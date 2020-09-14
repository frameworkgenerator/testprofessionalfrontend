import { all, takeLatest, put, call } from 'redux-saga/effects'
import { login, currentAccount, logout } from 'services/firebase.auth.service'
import actions from './actions'
import getProjectData from '../../services/spring.boot.service.projects.get'

export function* LOGIN({ payload }) {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const { email, password, tenant } = payload
  const response = yield call(login, email, password, tenant)
  console.log('Login response')
  console.log(JSON.stringify(response))
  const projects = yield call(getProjectData)
  const { uid: id, email: mail, photoURL: avatar, displayName } = response
  yield put({
    type: 'user/SET_STATE',
    payload: {
      id,
      name: 'Administrator',
      email: mail,
      avatar,
      role: 'admin',
      authorized: true,
      displayName,
    },
  })
  yield put({
    type: 'service/GET_PROJECTS',
    payload: {
      projects,
    },
  })
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* LOAD_CURRENT_ACCOUNT() {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const response = yield call(currentAccount)
  if (response) {
    const projects = yield call(getProjectData)
    if (projects) {
      yield put({
        type: 'service/GET_PROJECTS',
        payload: {
          projects,
        },
      })
    }
    const { uid: id, email, photoURL: avatar, displayName } = response
    yield put({
      type: 'user/SET_STATE',
      payload: {
        id,
        name: 'Administrator',
        email,
        avatar,
        role: 'admin',
        authorized: true,
        displayName,
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

export function* LOGOUT() {
  yield call(logout)
  yield put({
    type: 'user/SET_STATE',
    payload: {
      id: '',
      name: '',
      role: '',
      email: '',
      avatar: '',
      authorized: false,
      loading: false,
      token: '',
    },
  })
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.LOGIN, LOGIN),
    takeLatest(actions.LOGOUT, LOGOUT),
    LOAD_CURRENT_ACCOUNT(), // run once on app load to check user auth
  ])
}
