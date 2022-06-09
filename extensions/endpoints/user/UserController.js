const async_handler_1 = require("../../../node_modules/directus/dist/utils/async-handler");
const respond_1 = require("../../../node_modules/directus/dist/middleware/respond");
const services_1 = require("../../../node_modules/directus/dist/services");
const busboy_1 = __importDefault(require("busboy"));
const utils_1 = require("@directus/shared/utils");
const format_title_1 = __importDefault(require("@directus/format-title"));
const path_1 = __importDefault(require("path"));
const database_1 = require("../../../node_modules/directus/dist/database");
const cache_1 = require("../../../node_modules/directus/dist/cache");
const { stat } = require("fs");
const services_2 = require("../../services");
const { user } = require("pg/lib/defaults");
const { isNull } = require("util");
const env_1 = require("../../../node_modules/directus/dist/env");
const Joi = require("joi");
//const joiValidation = require('../../helper/joi-validation');



class UserController {

async createUser(req, res, next, services, exceptions) {
    const { AuthenticationService, ItemsService } = services
    const { InvalidCredentialsException, ForbiddenException, ServiceUnavailableException, InvalidPayloadException } = exceptions;
    let {name,email,password} = req.body;
    // const bodySchema = Joi.object({
    //     name: Joi.required(),
    //     email: Joi.required(),
    //     password: Joi.required()
    // });

    // const { error } = bodySchema.validate(bodySchema);
    // if (error) throw new InvalidPayloadException(error.message);

    const { schema } = req;
    const userService = new services_1.UsersService({schema});

    //let required = false;

    try{

        // if(name == '' || name == undefined || name == null){
        //     required = true;
        //     return next(new InvalidPayloadException('Name is required'));
        // }

        // if(email == '' || email == undefined || email == null){
        //     required = true;
        //     return next(new InvalidPayloadException('Email is required'));
        // }

        // if(required) return;

        let user = await userService.readByQuery(
            {
                filter: {
                    email: {
                        _eq: email
                    }
                },
                fields: ['*']
            }
        )

        if(user.length != 0)
        return next(new InvalidPayloadException("User already exist"));

        let userObj  = {
            first_name: name,
            email: email.toLowerCase(),
            password: password
        }
        let createdUser = await userService.createOne(userObj);
        let result = await userService.readOne(createdUser);
        delete result.password;
        res.locals.payload = {data: result};
        return next();
    }catch(err) {
        console.log(err);
        return next(new InvalidPayloadException(err));
    }    
}

async userList(req, res, next, services, exceptions,database) {
        const { AuthenticationService, ItemsService } = services
        const { InvalidCredentialsException, ForbiddenException, ServiceUnavailableException, InvalidPayloadException } = exceptions;
        let role = req.accountability.role;
        let user_id = req.accountability.user; 
        const { schema } = req; 
        let {search, page, size} = req.body;

        if (!page || page<1) page = 1;
        if (!size || size<1) size = 5;

        const limit = parseInt(size);
        const skip = (page - 1) * size;

        const UserService = new ItemsService('directus_users', { schema: req.schema });
        const customUserService = new services_2.UserService({schema}); 

        try {
            let userListAll = await customUserService.getUserList(search,null,null);
            let userList = await customUserService.getUserList(search,limit,skip);
            
            let total_count = userListAll.length;
            let total_page = total_count>0?total_count/limit:0;
            let meta = {total_count:total_count,total_page:Math.ceil(total_page)};
            res.locals.payload = { data: userList,meta:meta };
            return next();


        } catch (error) {
            console.log(error);
            return next(new ServiceUnavailableException(error));
        }

    }


}

module.exports = UserController;
