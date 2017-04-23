'use strict';
const _ = require('lodash');

module.exports = () => {
  return {
    handler : (opts) => {
      const error = opts.error;
      const response = opts.response;
      let logger = opts.request.logger;

      console.log(error);

      if (!_isFormattedError(error)) {
        error.details = error.message;
        error.statusCode = 500;
        error.name = 'InternalServerError';
        error.message = 'Internal Server Error';

      }

      if (error.stack != null || error.details != null || error.statusCode <= 500) {
        console.log(error.stack || error.details);
      }

      // get the message out of the error object
      const message = error.message;
      const plain = _.toPlainObject(error);
      delete plain.message;
      plain.message = message;
      if (!_.isString(plain.details)) {
         // This is to prevent circular references if this is an error object
         // if it was an error, it already got logged.
        delete plain.details;
      }

      response.statusCode = error.statusCode;
      response.setBody(plain);
    },
    errorHandler : (opts) => {
      const error = opts.error;
      const response = opts.response;

      console.error('Something very unexpected happened in the error middleware: ', error);

      const simplestErrorPossible = {
        statusCode : 500,
        name       : 'InternalServerError',
        message    : 'Internal Server Error'
      };
      response.setBody(JSON.stringify(simplestErrorPossible));
      response.end();
    }
  };
};

function _isFormattedError(error) {
  return error.statusCode != null;
}

function _validLogger(logger) {
  return (_.isObject(logger) && _.isFunction(logger.error));
}
