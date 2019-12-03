"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Comment extends Model {
  convert() {
    return this.belongsTo("App/Models/Convert");
  }

  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = Comment;
