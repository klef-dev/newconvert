"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");
Route.on("/").render("index");
Route.group(() => {
  Route.post("auth/signup", "UserController.register");
  Route.post("auth/login", "UserController.login");
  Route.patch("auth/edit/:id", "UserController.edit").middleware("auth");

  Route.get("/user", "UserController.getUser").middleware("auth");
  Route.post("/upload", "UserController.upload").middleware("auth");

  Route.get("/convert", "ConvertController.index").middleware("auth");
  Route.post("/convert", "ConvertController.create").middleware("auth");
  Route.get("/totalconverts", "ConvertController.totalConverts").middleware(
    "auth"
  );
  Route.get("/year", "ConvertController.year").middleware("auth");
  Route.get("/tcpy/:year", "ConvertController.getTotalYearly").middleware(
    "auth"
  );
  Route.get("/month", "ConvertController.month").middleware("auth");
  Route.get("/tcpm/:month", "ConvertController.getTotalMonthly").middleware(
    "auth"
  );
  Route.get("/semester", "ConvertController.semester").middleware("auth");
  Route.get(
    "/tcps/:semester",
    "ConvertController.getTotalSemesterly"
  ).middleware("auth");
  Route.get("/rededicated", "ConvertController.Rededicated").middleware("auth");
  Route.get("/newlyconverted", "ConvertController.newlyConverted").middleware(
    "auth"
  );
}).prefix("api/v1");
Route.on("*").render("index");
