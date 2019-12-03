"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", table => {
      table.increments();
      table
        .string("webmail", 191)
        .notNullable()
        .unique();
      table.string("password", 60).notNullable();
      table
        .string("unit", 20)
        .notNullable()
        .unique();
      table
        .string("head", 191)
        .notNullable()
        .unique();
      table
        .string("assistant", 191)
        .notNullable()
        .unique();
      table.string("profilePic", 191).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
