import { connectRouter, push } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { Status } from './utils'

export const history = createBrowserHistory()

export const routerReducer = connectRouter(history)

export type State = ReturnType<typeof routerReducer>

export interface IFilter {
  hash: string
  status: Status
  query: string
}

export function filterSelector(state: State): IFilter {
  const location = state.location
  return {
    hash: location.hash,
    status: location.pathname as Status,
    query: new URLSearchParams(location.search).get('query') || '',
  }
}

export function filterPush({status, query, hash}: Partial<IFilter>) {
  return push({
    hash,
    pathname: status,
    search: query  ? `?query=${query}` : undefined,
  })
}
