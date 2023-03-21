import { Schema } from "mongoose";
import { dbContext } from "../db/DbContext.js";
import { profileService } from "../services/ProfileService.js";

export const FollowerSchema = new Schema(
  {
    accountId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
    followingId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

FollowerSchema.virtual("creator", {
  localField: "followingId",
  ref: "Account",
  foreignField: "_id",
  justOne: true,
});

FollowerSchema.index({ followingId: 1, accountId: 1 }, { unique: true });