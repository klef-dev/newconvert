"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ConvertsSchema extends Schema {
  up() {
    this.create("converts", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users");
      table.integer("reg_no", 7).notNullable();
      table.string("name", 191).notNullable();
      table.string("webmail", 200).notNullable();
      table.string("programme", 65).notNullable();
      table.string("hall", 20).notNullable();
      table.string("room", 4).notNullable();
      table.string("spiritual", 20).notNullable();
      table.string("water", 3).notNullable();
      table.string("holy", 3).notNullable();
      table.integer("year", 4).notNullable();
      table.integer("month", 2).notNullable();
      table.string("semester", 6).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("converts");
  }
}

module.exports = ConvertsSchema;
