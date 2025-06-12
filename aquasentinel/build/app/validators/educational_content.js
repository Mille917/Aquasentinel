import vine from '@vinejs/vine';
export const createEducationalContentValidator = vine.compile(vine.object({
    title: vine.string().trim().minLength(3),
    content: vine.string().trim(),
    category: vine.string().trim(),
    forecastId: vine.number().positive(),
}));
export const updateEducationalContentValidator = vine.compile(vine.object({
    title: vine.string().trim().optional(),
    content: vine.string().trim().optional(),
    category: vine.string().trim().optional(),
    forecastId: vine.number().positive().optional(),
}));
