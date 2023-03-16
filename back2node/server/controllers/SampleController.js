import BaseController from "../utils/BaseController.js";

import { Auth0Provider } from "@bcwdev/auth0provider";
import { sampleService } from "../services/SampleService.js";


export class SampleController extends BaseController{
  constructor(){
    super('api/samples');
    this.router
    .get('', this.getAllSamples)
    .get('', this.getOneSample)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createSample)
  }
  async createSample(req, res,  next) {
    try {
      req.body.creatorId = req.userInfo.id
      const createSample = await sampleService.createSample(req.body)
      return res.send(createSample)
    } catch (error) {
      
    }
  }
  getOneSample(arg0, getOneSample) {
    
  }
  async getAllSamples(req, res, next) {
    try {
      const samples = await sampleService.getAllSamples()
      return res.send(samples)
    } catch (error) {
      
    }
  }
  c
}