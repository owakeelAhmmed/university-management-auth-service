import config from '../../../config'
import ApiError from '../../../error/ApiError'
import { generateUserId } from './user.utils'
import { IUser } from './user.interface'
import { User } from './user.model'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const id = await generateUserId()

  user.id = id

  if (!user.password) {
    user.password = config.default_user_password as string
  }

  const createUser = await User.create(user)
  if (!createUser) {
    throw new ApiError(400, 'User creation failed')
  }
  return createUser
}

export default {
  createUser,
}
