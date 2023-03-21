
import { dbContext } from "../db/DbContext.js";
import {profileService} from "../services/ProfileService.js";

class FollowersService{
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