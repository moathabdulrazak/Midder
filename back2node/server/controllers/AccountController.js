import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { firebaseService } from "../services/firebaseService.js"
import { sampleService } from "../services/SampleService.js"
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/firebase', this.getFirebaseToken)
      .get('/samples', this.getMySamples)
  }
  async getMySamples(req, res,  next) {
    try {
      const samples = await sampleService.getMySamples(req.userInfo._id)
      return res.send(samples)
    } catch (error) {
      next(error)
    }
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
  async getFirebaseToken(req, res, next) {
    try {
      const token = await firebaseService.getToken(req.userInfo.id)
      // NOTE send the token back as an object, or else you won't be able to target it if needed
      return res.send({ token })
    } catch (error) {
      next(error)
    }
  }
}
