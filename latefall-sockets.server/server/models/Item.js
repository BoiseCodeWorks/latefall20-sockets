import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Item = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default Item
