import actions from './actions'

const initialState = {
  dataSets: [],
  fields: [],
  dropDown: [],
  projects: [],
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_DATASETS:
      return { ...state, ...action.payload }
    case actions.GET_FIELDS:
      return { ...state, ...action.payload }
    case actions.GET_DROPDOWN:
      return { ...state, ...action.payload }
    case actions.GET_PROJECTS:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
