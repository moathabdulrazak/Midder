
import { dbContext } from "../db/DbContext.js";
import {profileService} from "../services/ProfileService.js";
import { BadRequest } from "../utils/Errors.js";

class FollowersService{
  async unfollowUser(id, accountId) {
    const follow = await dbContext.Followers.findOne({ _id: id, accountId: accountId }).populate('creator');
    if (!follow) {
      throw new BadRequest('No follow found');
    }
    // @ts-ignore
    const profile = await profileService.getProfileById(follow.followingId);
    // @ts-ignore
    profile.isFollowed = false;
    // @ts-ignore
    await profile.save();
    // @ts-ignore
    await follow.remove();
    return `Successfully unfollowed`;
  }

  
  async followUser(body) {

    const profile = await profileService.getProfileById(body.followingId)

    const follow = await dbContext.Followers.create(body)

   // @ts-ignore
    profile.isFollowed = true

    // @ts-ignore
   await profile.save()
    await follow.populate('creator')
    return follow
  }

}




export const followersService = new FollowersService();