import {createContext} from 'react'
import { UserInterface } from '../../backend/resources/users/user.interface'

const UserContext = createContext<UserInterface | undefined>(undefined)
export {UserContext} 