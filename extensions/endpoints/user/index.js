const async_handler_1 = require("../../../node_modules/directus/dist/utils/async-handler");
const respond_1 = require("../../../node_modules/directus/dist/middleware/respond");
const services_1 = require("../../../node_modules/directus/dist/services");
const busboy_1 = __importDefault(require("busboy"));
const utils_1 = require("@directus/shared/utils");
const format_title_1 = __importDefault(require("@directus/format-title"));
const path_1 = __importDefault(require("path"));
const database_1 = require("../../../node_modules/directus/dist/database");
const { stat } = require("fs");
const services_2 = require("../../services");
const { getUnpackedSettings } = require("http2");
const UserController = require("./UserController");
const UserControllerObj = new UserController();
module.exports = function registerEndpoint(router, { services, exceptions,database }) {

  router.post(
    "/list",
    async_handler_1.default(async (req, res, next) => { 
      await UserControllerObj.userList(req, res, next, services, exceptions,database);
    }),
    respond_1.respond
  );

  router.post(
    "/create",
    async_handler_1.default(async (req, res, next) => { 
      await UserControllerObj.createUser(req, res, next, services, exceptions,database);
    }),
    respond_1.respond
  );



};

