import {getRepository} from "typeorm";
import {User} from '../models'

export interface IUserPayload {
  firstName: string;
  lastName: string;
  email: string
}

export const getUsers  = async () :Promise<Array<User>> => {
  const userRepository = getRepository(User);
  return userRepository.find()
}
export const getTest  = async () :Promise<Array<User>> => {
  return await getRepository(User)
      .createQueryBuilder("user")
      .select(["user.id", "user.firstName", "user.lastName"])
      .leftJoinAndSelect("user.posts", "post")
      .take(10)
      .getMany();
}

export const createUser  = async (payload: IUserPayload) :Promise<User> => {
  const userRepository = getRepository(User);
  const user = new User()
  return userRepository.save({
    ...user,
    ...payload
  })
}

export const getUser  = async (id: number) :Promise<User | null> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({id: id})
  if (!user) return null
  return user
}
