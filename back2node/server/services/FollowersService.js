
import { dbContext } from "../db/DbContext.js";
import {profileService} from "../services/ProfileService.js";
import { BadRequest } from "../utils/Errors.js";

class FollowersService{
  async unfollowUser(id, accountId) {
    debugger
    const follow = await dbContext.Followers.findById(id).populate('creator')
    if (!follow) {
      throw new BadRequest('No follow found');
    }
    const profile = await profileService.getProfileById(accountId);
    if (follow) {
      await follow.remove();
    }
    // @ts-ignore
    profile.isFollowed = false;
    // @ts-ignore
    await profile.save();
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