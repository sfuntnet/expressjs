import {ConnectionOptions} from 'typeorm'
import {User, Post, Comment} from '../models'

const config : ConnectionOptions | any = {
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Post, Comment],
  synchronize: true,
}

export default config
