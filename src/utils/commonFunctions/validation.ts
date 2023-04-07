import {Joi} from 'celebrate';

const VALIDATION = {
  USER: {
    NAME: Joi.string().min(2).max(30),
    EMAIL: Joi.string().trim().email().max(50),
    PASSWORD: Joi.string().min(8).max(30),
    PHONE: Joi.string().min(10).max(15),
    EMPLOYEEID: Joi.string().alphanum().min(3).max(10),
    ACCOUNTTYPE: Joi.number().valid(1, 2),
  },

  authorizationHeaderObj: Joi.object({
    devicedetails: Joi.object()
      .keys({
        deviceType: Joi.number().valid(0, 1, 2).required(),
        deviceToken: Joi.string().allow('').optional(),
        deviceId: Joi.string().required(),
      })
      .optional(),
  }).unknown(),
};

export default VALIDATION;
