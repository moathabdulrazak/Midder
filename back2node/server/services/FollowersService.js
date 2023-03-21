
import { dbContext } from "../db/DbContext.js";
import {profileService} from "../services/ProfileService.js";

class FollowersService{
  async followUser(followerData) {
    debugger

    const profile = await profileService.getProfileById(followerData.followingId)

    const follow = await dbContext.Followers.create(followerData)
   // @ts-ignore
   profile.isFollowed = true
    await follow.populate('creator')
    return follow
  }

}




export const followersService = new FollowersService();