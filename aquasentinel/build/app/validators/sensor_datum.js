import vine from '@vinejs/vine';
export const createSensorDataValidator = vine.compile(vine.object({
    location: vine.string().trim(),
    temperature: vine.number().optional(),
    humidity: vine.number().optional(),
    rainfall: vine.number().optional(),
    waterLevel: vine.number().optional(),
    recordedAt: vine.date().optional(),
}));
