"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const argon2_1 = __importDefault(require("argon2"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const liquidjs_1 = require("liquidjs");
const database_1 = require("../../node_modules/directus/dist/database");
const services_1 = require("../../node_modules/directus/dist/services");
const exceptions_1 = require("../../node_modules/directus/dist/exceptions");
const is_url_allowed_1 = __importDefault(require("../../node_modules/directus/dist/utils/is-url-allowed"));
const services_2 = require("./");
const mail_1 = require("../../node_modules/directus/dist/services/mail");
const env_1 = require("../../node_modules/directus/dist/env");
const axios = require("axios");
const { exit, off } = require("process");
const liquidEngine = new liquidjs_1.Liquid({
  root: [path_1.default.resolve(env_1.default.EXTENSIONS_PATH, "templates"), path_1.default.resolve(__dirname, "templates")],
  extname: ".liquid",
});
const { ItemsService } = services_1;

class UserService {
  constructor(options) {

    this.knex = options.knex || database_1.default();
    this.accountability = options.accountability || null;
    this.schema = options.schema;
    this.next = options.next || null;
    this.usersService = new services_1.UsersService({ knex: this.knex, schema: options.schema, accountability: this.accountability });
    this.activityService = new services_1.ActivityService({ knex: this.knex, schema: options.schema, accountability: this.accountability });
    this.revisionsService = new services_1.RevisionsService({ knex: this.knex, schema: options.schema, accountability: this.accountability });
    this.permissionsService = new services_1.PermissionsService({ knex: this.knex, schema: options.schema, accountability: this.accountability });
  }

  async getUserList(search, limit, skip) {
    try {
          let query= `SELECT dr.id as role_id, du.id,first_name AS fullname, email,du.status,dr.name as role 
          FROM directus_users as du
          left Join directus_roles as dr on du.role = dr.id  
          where 1=1 `;

          if (search && search != undefined && search != null && search != "") {
            query += ` and (du.first_name::text LIKE '%${search.toLowerCase()}%'  or du.email::text LIKE '%${search.toLowerCase()}%' or LOWER(du.last_name) LIKE '%${search.toLowerCase()}%') `;
          }

          query += "  order by fullname ASC";
          if (limit && limit != undefined && limit != null && limit != "") {
                query += " limit " + limit;
          }
          if (skip && skip != undefined && skip != null && skip != "") {
          query += " offset " + skip;
          }
          console.log(query);
          var userList = await database_1.default().raw(query);
          const userListResult = await userList;
          const userListResultRows = userListResult.rows;

      return userListResultRows;
    } catch (e) {
      console.log(e);
    }
  }

}
exports.UserService = UserService;
