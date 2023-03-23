import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    // userName: { type: String, required: true },
    sampleId: { type: Schema.Types.ObjectId, ref: 'samples' },
    picture: { type: String },
    coverImg: { type: String },
    isFollowed: { type: Boolean, required: true, default: false },
    
    // NOTE If you wish to add additional properties do so here


  },
  { timestamps: true, toJSON: { virtuals: true } }
)

