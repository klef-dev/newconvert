"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");

class InvalidAccessException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle(error, { response }) {
    return response.status(403).json({
      error: "Invalid access, can not perform this action"
    });
  }
}

module.exports = InvalidAccessException;
