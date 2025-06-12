import vine from '@vinejs/vine';
export const createReportValidator = vine.compile(vine.object({
    title: vine.string().trim().minLength(3),
    content: vine.string().trim(),
    status: vine.enum(['pending', 'reviewed', 'approved', 'rejected']),
}));
export const updateReportValidator = vine.compile(vine.object({
    title: vine.string().trim().optional(),
    content: vine.string().trim().optional(),
    status: vine.enum(['pending', 'reviewed', 'approved', 'rejected']).optional(),
}));
