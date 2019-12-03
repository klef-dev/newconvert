const InvalidAccessException = use("App/Exceptions/InvalidAccessException");
const ResourceNotExistException = use(
  "App/Exceptions/ResourceNotExistException"
);

class AdminService {
  verifyPermission(user, resource) {
    if (user.position != "Admin") {
      throw new InvalidAccessException(); // todo: invalid access exception;
    }
    if (!resource) {
      throw new ResourceNotExistException(); // todo: invalid id or data not found exception
    }
  }
}

module.exports = new AdminService();
