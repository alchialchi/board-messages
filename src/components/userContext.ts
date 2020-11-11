import React from 'react'

import { User } from '../types'

export const CurrentUserContext = React.createContext<User | undefined>(
  undefined
)

export const useCurrentUser = () => React.useContext(CurrentUserContext)
