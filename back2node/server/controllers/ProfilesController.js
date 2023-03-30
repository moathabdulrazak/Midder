import { profileService } from '../services/ProfileService.js'
import BaseController from '../utils/BaseController'
import { sampleService } from '../services/SampleService.js'
export class ProfilesController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router
      .get('', this.getProfiles)
      .get('/:id', this.getProfile)
      .get('/:id/samples', this.getSamplesByProfileId)
  }

  async getSamplesByProfileId(req, res, next){
    try {
      const samples = await  sampleService.getSamplesByProfileId(req.params.id)
      return res.send(samples)
    } catch (error) {
      next(error)
    }
  }

  async getProfiles(req, res, next) {
    try {
      const profiles = await profileService.findProfiles(req.query.name, req.query.offset)
      res.send(profiles)
    } catch (error) {
      next(error)
    }
  }

  async getProfile(req, res, next) {
    try {
      const profile = await profileService.getProfileById(req.params.id)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }
}
