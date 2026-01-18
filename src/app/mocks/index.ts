import { authHandlers } from '@modules/auth/handlers/auth'
import { productsHandlers } from '@modules/catalog/handlers'
import { logoutHandlers} from '@shared/mocks'

export const handlers = [...authHandlers, ...productsHandlers, ...logoutHandlers]