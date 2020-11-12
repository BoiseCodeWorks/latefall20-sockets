import mongoose from 'mongoose'
import ItemSchema from '../models/Item'
import ValueSchema from '../models/Value'

import ProfileSchema from '../models/Profile'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Items = mongoose.model('Item', ItemSchema);

  Profile = mongoose.model('Profile', ProfileSchema);
}

export const dbContext = new DbContext()
