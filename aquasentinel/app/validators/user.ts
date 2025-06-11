import vine from '@vinejs/vine'

export const updateUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(3).optional(),
    email: vine.string().trim().email().optional(),
    password: vine.string().trim().minLength(6).optional(),
    firstName: vine.string().trim().optional(),
    lastName: vine.string().trim().optional(),
    phone_number: vine.string().trim().optional(),
  })
)
