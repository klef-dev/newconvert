"use strict";

const User = use("App/Models/User");
const CloudinaryService = use("App/Services/CloudinaryService");

class UserController {
  // Login a User
  async login({ request, auth }) {
    const { webmail, password } = request.all();
    const token = await auth.attempt(webmail, password);
    return token;
  }

  // Register a User
  async register({ request, response, auth }) {
    if (auth.unit != "Hospitality") {
      return response.status(401).json({
        msg: "Unauthorized access, can not perform this action",
        error: true
      });
    }
    const { webmail, unit, head, assistant, password } = request.all();
    const profilePic = request.file("file", {
      types: ["image"],
      size: "2mb",
      extnames: ["png", "jpg"]
    });
    if (
      webmail == undefined ||
      unit == undefined ||
      head == undefined ||
      assistant == undefined ||
      password == undefined ||
      profilePic == undefined
    ) {
      return { msg: "All fields are required", error: true };
    }
    try {
      const cloudinaryResponse = await CloudinaryService.v2.uploader.upload(
        profilePic.tmpPath,
        { folder: "uploads" }
      );
      const checkWebmail = await User.findBy("webmail", webmail);
      const checkUnit = await User.findBy("unit", unit);
      if (checkWebmail) {
        return { msg: "Webmail already exists", error: true };
      }
      if (checkUnit) {
        return { msg: "Service unit already exists", error: true };
      }
      const user = await User.create({
        profilePic: cloudinaryResponse.secure_url,
        webmail,
        unit,
        head,
        assistant,
        password
      });
      return this.login(...arguments);
    } catch (e) {
      return {
        msg:
          "Error uploading image, make sure you're connected to the internet",
        error: true
      };
    }
  }

  async getUser({ auth }) {
    const user = await auth.getUser();
    return {
      id: user.id,
      profilePic: user.profilePic,
      webmail: user.webmail,
      unit: user.unit,
      head: user.head,
      assistant: user.assistant
    };
  }

  async edit({ request, response, params, auth }) {
    const authUser = await auth.getUser();
    const { id } = params;
    const user = await User.find(id);
    if (!user) {
      return response.status(403).json({
        msg: "Not registered with us",
        error: true
      });
    }
    if (authUser.id != user.id) {
      return response.status(403).json({
        msg: "Can't edit another user's data",
        error: true
      });
    }
    const { webmail, unit, head, assistant } = request.all();
    if (
      webmail == undefined ||
      unit == undefined ||
      head == undefined ||
      assistant == undefined
    ) {
      return { msg: "All fields are required", error: true };
    }
    const checkWebmail = await User.findBy("webmail", webmail);
    if (checkWebmail) {
      if (checkWebmail.webmail != authUser.webmail) {
        return { msg: "Webmail already taken by another unit", error: true };
      }
    }
    const checkUnit = await User.findBy("unit", unit);
    if (checkUnit) {
      if (checkUnit.unit != authUser.unit) {
        return { msg: "Unit name already taken by another unit", error: true };
      }
    }
    user.merge(request.only(["webmail", "unit", "head", "assistant"]));
    await user.save();
    return {
      id: user.id,
      profilePic: user.profilePic,
      webmail: user.webmail,
      unit: user.unit,
      head: user.head,
      assistant: user.assistant
    };
  }
}

module.exports = UserController;
