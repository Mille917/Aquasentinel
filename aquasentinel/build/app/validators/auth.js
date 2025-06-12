import vine from '@vinejs/vine';
export const loginValidator = vine.compile(vine.object({
    email: vine.string().trim().email(),
    password: vine.string().trim().minLength(6),
}));
export const registerValidator = vine.compile(vine.object({
    username: vine.string().trim().minLength(3),
    email: vine.string().trim().email(),
    password: vine.string().trim().minLength(6),
    country: vine.string().trim(),
    region: vine.string().trim(),
    role: vine.enum(['admin', 'moderator', 'Citizen', 'user']),
}));
