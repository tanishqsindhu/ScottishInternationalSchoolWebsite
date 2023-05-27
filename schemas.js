const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

module.exports.studentSchema = Joi.object({
    student: Joi.object({
        name: Joi.string().required().escapeHTML(),
        registrationNum: Joi.number().required().min(1),
        rollNumber: Joi.number().required().min(1),
        whatsappNumber: Joi.number(),
        balance: Joi.number().required(),
        class: Joi.string().required().escapeHTML(),
        section: Joi.string().required().escapeHTML()
    }).required(),
    deleteImages: Joi.array()
});

module.exports.orderSchema = Joi.object({
    order: Joi.object({
        price: Joi.number().required().min(0),
        meal: Joi.string().required().escapeHTML(),
        time: Joi.string().required().escapeHTML()
    }).required()
})