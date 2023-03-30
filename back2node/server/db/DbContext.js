import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { FollowerSchema } from "../models/Follower.js";
import { SampleSchema } from "../models/Sample.js";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Followers = mongoose.model('Follower', FollowerSchema)

  Sample = mongoose.model('sample', SampleSchema)
}

export const dbContext = new DbContext()
