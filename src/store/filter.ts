import { connectRouter, push } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { Status } from './utils'

export const history = createBrowserHistory()

export const routerReducer = connectRouter(history)

export type State = ReturnType<typeof routerReducer>

export function statusSelector(state: State): Status {
  const pathname = state.location.pathname as Status
  return Object.values(Status).includes(pathname) ? (pathname) : Status.All
}

export function querySelector(state: State): string {
  return new URLSearchParams(state.location.search).get('query') || ''
}

interface PushArg {
  status?: Status
  query?: string
}

export function filterPush({status, query}: PushArg) {
  return push({
    pathname: status,
    search: query  ? `?query=${query}` : undefined,
  })
}
