// @flow

type IdT = symbol

export type ErrorT = {
  id: IdT,
}

export type ErrorsIdT = IdT | $ReadOnlyArray<IdT>

export type ErrorsOwnerT = string

export type ErrorAddActionT = 'ERRORS:ADD'
export type ErrorRemoveActionT = 'ERRORS:REMOVE'
