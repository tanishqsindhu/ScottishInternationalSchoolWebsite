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
        },
        sanitizeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: ['h1','h2','h3','h4','p','br','strong','em','u','s','ol','ul','li','a','blockquote','span'],
                    allowedAttributes: {
                        'a': ['href','target','rel'],
                        'span': ['style'],
                        'p': ['class','style'],
                        'h1': ['class','style'],
                        'h2': ['class','style'],
                        'h3': ['class','style'],
                        'h4': ['class','style'],
                        'li': ['class','style'],
                        'ol': ['style'],
                        'ul': ['style'],
                    },
                    allowedStyles: {
                        '*': {
                            'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
                            'background-color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
                            'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
                        }
                    }
                });
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

module.exports.articleSchema = Joi.object({
    article: Joi.object({
        title: Joi.string().required().escapeHTML(),
        secondaryTitle: Joi.string().required().escapeHTML(),
        date: Joi.string().required().escapeHTML(),
        month: Joi.string().required().escapeHTML(),
        year: Joi.number().required(),
        shortDescription: Joi.string().required().escapeHTML(),
        content: Joi.string().allow('').sanitizeHTML(),
        author: Joi.string().allow('').escapeHTML(),
    }).required(),
    deleteImages: Joi.array()
})