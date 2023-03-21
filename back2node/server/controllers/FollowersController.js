import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";



export class FollowersController extends BaseController {
  constructor(){
    super('api/followers');
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.followUser)
    .delete('/:id', this.unfollowUser)
  }
  unfollowUser(req, res, next) {
  }
  followUser(req, res, next ) {
    
  }
}