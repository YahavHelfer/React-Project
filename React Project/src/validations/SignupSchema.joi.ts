import Joi from "joi";

export const SignUpJoiSchema = Joi.object({
    name: Joi.object({
        first: Joi.string().min(2).max(256).required(),
        middle: Joi.string().min(2).max(256).optional(),
        last: Joi.string().min(2).max(256).required(),
    }),

    phone: Joi.string()
        .ruleset.regex(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
        .rule({ message: 'card "phone" mast be a valid phone number' })
        .required(),

    email: Joi.string()
        .ruleset.pattern(
            /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
        )
        .rule({ message: 'card "mail" mast be a valid mail' })
        .required(),

    password: Joi.string()
        .ruleset.pattern(
            /((?=.*[0-9]{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$ %^&*-]{1}).{8,20})/
        )
        .rule({
            message:
                `
                "password" must be at least nine characters long and contain an uppercase letter, 
                a lowercase letter, a number and one of the following characters !@#$%^&*-
            `,
        })
        .required(),

    image: Joi.object()
        .keys({
            url: Joi.string()
                .ruleset.regex(/(http?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)
                .rule({ message: 'card.image "url" mast be a valid url' })
                .allow(""),
            alt: Joi.string().min(2).max(256).allow(""),
        }),

    address: Joi.object()
        .keys({
            state: Joi.string().allow(""),
            country: Joi.string().min(2).max(256).required(),
            city: Joi.string().min(2).max(256).required(),
            street: Joi.string().min(2).max(256).required(),
            houseNumber: Joi.number().required(),
            zip: Joi.number(),
        }),

    isBusiness: Joi.boolean().allow(),
});
