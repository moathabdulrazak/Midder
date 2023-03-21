import { Auth0Provider } from "@bcwdev/auth0provider";
import { followersService } from "../services/FollowersService.js";
import BaseController from "../utils/BaseController.js";



export class FollowersController extends BaseController {
  constructor(){
    super('api/followers');
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('/:id', this.followUser)
    .delete('/:id', this.unfollowUser)
  }
  async unfollowUser(req, res, next) {
  }
   async followUser(req, res, next ) {
    try {
      req.body.accountId = req.userInfo.id
      const follower = await followersService.followUser(req.body.followingId)
      res.send(follower)
    } catch (error) {
      next(error)
    }
  }
}