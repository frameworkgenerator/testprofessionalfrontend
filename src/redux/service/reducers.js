import actions from './actions'

const initialState = {
  fields: [],
  tests: [],
  dropDown: [],
  projects: [],
  testPlans: [],
  testSets: [],
  testCases: [],
  testSteps: [],
  dataSets: [],
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_FIELDS:
      return { ...state, ...action.payload }
    case actions.GET_DROPDOWN:
      return { ...state, ...action.payload }
    case actions.GET_PROJECTS:
      return { ...state, ...action.payload }
    case actions.GET_DATASETS:
      return { ...state, ...action.payload }
    case actions.GET_TESTPLANS:
      return { ...state, ...action.payload }
    case actions.GET_TESTSETS:
      return { ...state, ...action.payload }
    case actions.GET_TESTCASES:
      return { ...state, ...action.payload }
    case actions.GET_TESTSTEPS:
      return { ...state, ...action.payload }
    case actions.GET_TESTS:
      return { ...state, ...action.payload }
    case actions.SET_PROJECTS:
      return { ...state, ...action.payload }
    case actions.DELETE_PROJECTS:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
