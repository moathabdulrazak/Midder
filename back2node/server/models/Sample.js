import { Schema } from "mongoose";


export const SongSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  name: { type: String, required: true },
  key: { type: String, required: true },
  coverImg: { type: String, },
  genre: { type: String },
  songUrl: { type: String, required: true },
  streams: { type: Number, required: false, default: 0 },
}, { timestamps: true, toJSON: { virtuals: true } })



SongSchema.virtual('artist', {
  localField: 'artistId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
