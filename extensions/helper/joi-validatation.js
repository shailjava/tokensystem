const Joi = require('joi'); 
const validateScreen1Form = (async (user, messages) => {
    const JoiSchema = Joi.object({
        name: Joi.string()  // Integer
        .required()
        .messages({ 
           // "string.base": "",
            "string.empty":"Empty",
            "any.required": "required"
        }),
        email: Joi.string()  // Integer
        .required()
        .messages({ 
           // "string.base": "",
            "string.empty": "Empty",
            "any.required": "required"
        }),
        password: Joi.string()  // Integer
        .required()
        .messages({ 
        //"string.base": "",
            "string.empty": "Empty",
            "any.required": "required"
        }),
    });
    const result = JoiSchema.validate(user);
    return result;
});

const validateScreen2Form = (async (user, messages) => {
    const JoiSchema = Joi.object({
        school_id: Joi.string()  // Integer
        .required()
        .messages({ 
            "string.base": messages.school_basic_deatils_id_min_length,
            "string.empty": messages.school_basic_deatils_id_empty,
            "any.required": messages.school_basic_deatils_id_required
        }),
        academic_year_id: Joi.number()    // Integer
        .messages({
            "number.base": messages.school_academic_years_integer_base,
            "any.required": messages.school_academic_years_required
        }),
    });
    const result = JoiSchema.validate(user);
    return result;
});

const updateErrorMessage = (async (errorsArray)=>{
    let updatedErrors = [];
    Promise.all(errorsArray.map((element, index) => {
        let obj = {};
        obj[element.context.key] = element.message;
        updatedErrors.push(obj);
    }))
    return updatedErrors;
});

module.exports = {
    validateScreen1Form,
    validateScreen2Form,
    updateErrorMessage
};
