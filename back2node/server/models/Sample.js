import { Schema } from "mongoose";


export const SampleSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  name: { type: String, required: true },
  key: { type: String, required: true },
  description: { type: String, required: true },
  coverImg: { type: String, },
  genre: { type: String },
  songUrl: { type: String, required: true },
  streams: { type: Number, required: false, default: 0 },
}, { timestamps: true, toJSON: { virtuals: true } })



SampleSchema.virtual('artist', {
  localField: 'artistId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
