import BaseController from "../utils/BaseController.js";

import { Auth0Provider } from "@bcwdev/auth0provider";
import { sampleService } from "../services/SampleService.js";


export class SampleController extends BaseController{
  constructor(){
    super('api/samples');
    this.router
    .get('', this.getAllSamples)
    .get('/:id', this.getOneSample)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createSample)
    .put('/:id', this.updateSample)
    .delete('/:id', this.removeSample)
  }
  async updateSample(req, res, next) {
    try {
      const updatedSample = await sampleService.updateSample(req.params.id, req.body)
      return res.send(updatedSample)
    } catch (error) {
      next(error)
    }
  }
  async removeSample(req, res, next) {
   try {
    req.body.accountId  = req.userInfo.id
    const removeMessage = await sampleService.removeSample(req.params.id, req.userInfo.id)
    return res.send(removeMessage)
   } catch (error) {
    next(error)
   }

  }
  async createSample(req, res,  next) {
    try {
      req.body.creatorId = req.userInfo.id
      const createSample = await sampleService.createSample(req.body)
      return res.send(createSample)
    } catch (error) {
      
    }
  }
  async getOneSample(req, res, next) {
    try {
      const sample = await sampleService.getOneSample(req.params.id)
      return res.send(sample)
    } catch (error) {
      next(error)
    }
    
  }
  async getAllSamples(req, res, next) {
    try {
      const samples = await sampleService.getAllSamples()
      return res.send(samples)
    } catch (error) {
      next(error)
    }
  }
  c
}