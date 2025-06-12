import EducationalContent from '#models/educational_content';
import Forecast from '#models/forecast';
// Import VineJS validators
import { createEducationalContentValidator, updateEducationalContentValidator } from '#validators/educational_content';
export default class EducationalContentController {
    async index({ view, request }) {
        const category = request.input('category');
        const query = EducationalContent.query().preload('user').preload('forecast');
        if (category) {
            query.where('category', category);
        }
        const contents = await query;
        return view.render('educational_contents/index', { contents, category });
    }
    async create({ view }) {
        const forecasts = await Forecast.query();
        return view.render('educational_contents/create', { forecasts });
    }
    async store({ request, auth, response }) {
        const user = auth.user;
        // Validate request using VineJS
        const payload = await request.validateUsing(createEducationalContentValidator);
        // Ensure forecast exists
        const forecast = await Forecast.find(payload.forecastId);
        if (!forecast) {
            return response.badRequest({ message: 'Forecast not found' });
        }
        // Create content
        const content = await EducationalContent.create({ ...payload, userId: user.id });
        return response.created(content);
    }
    async show({ params, response }) {
        const id = Number(params.id);
        if (isNaN(id) || id < 1) {
            return response.badRequest({ message: 'Invalid content ID' });
        }
        const content = await EducationalContent.query()
            .where('id', id)
            .preload('user')
            .preload('forecast')
            .first();
        if (!content) {
            return response.notFound({ message: 'Content not found' });
        }
        return response.ok(content);
    }
    async byCategory({ params, view }) {
        const category = params.category;
        const contents = await EducationalContent.query()
            .whereRaw('LOWER(category) = ?', [category.toLowerCase()])
            .preload('user')
            .preload('forecast');
        return view.render('educational_contents/category', { contents, category });
    }
    async showDetail({ params, view }) {
        const tip = await EducationalContent.findOrFail(params.id);
        await tip.load('user');
        await tip.load('forecast');
        return view.render('educational_contents/detail', { tip });
    }
    async update({ params, request, auth, response }) {
        const user = auth.user;
        const content = await EducationalContent.findOrFail(params.id);
        if (content.userId !== user.id) {
            return response.forbidden({ message: 'You do not have permission to update this content' });
        }
        // Validate update request using VineJS
        const payload = await request.validateUsing(updateEducationalContentValidator);
        content.merge(payload);
        await content.save();
        return response.ok(content);
    }
    async destroy({ params, auth, response }) {
        const user = auth.user;
        const content = await EducationalContent.findOrFail(params.id);
        if (content.userId !== user.id) {
            return response.forbidden({ message: 'You do not have permission to delete this content' });
        }
        await content.delete();
        return response.noContent();
    }
}
