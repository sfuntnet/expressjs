import {ConnectionOptions} from 'typeorm'
import {User, Post, Comment} from '../models'

const config : ConnectionOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "1234",
  database: "type_orm_data",
  entities: [User, Post, Comment],
  synchronize: true,
}

export default config
