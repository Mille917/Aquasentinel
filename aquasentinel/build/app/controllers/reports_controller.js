import Report from '#models/report';
export default class ReportsController {
    async index({ response }) {
        try {
            const reports = await Report.all();
            return response.json(reports);
        }
        catch (error) {
            return response.status(500).json({ error: 'Failed to fetch reports' });
        }
    }
    async show({ params, response }) {
        const { id } = params;
        try {
            const report = await Report.findOrFail(id);
            return response.json(report);
        }
        catch (error) {
            return response.status(404).json({ error: 'Report not found' });
        }
    }
    async destroy({ params, response }) {
        const { id } = params;
        try {
            const report = await Report.findOrFail(id);
            await report.delete();
            return response.json({ message: 'Report deleted successfully' });
        }
        catch (error) {
            return response.status(404).json({ error: 'Report not found' });
        }
    }
    async update({ params, request, response }) {
        const { id } = params;
        const data = request.only(['title', 'content', 'status']);
        try {
            const report = await Report.findOrFail(id);
            report.merge(data);
            await report.save();
            return response.json(report);
        }
        catch (error) {
            return response.status(404).json({ error: 'Report not found' });
        }
    }
    async store({ request, response }) {
        const data = request.only(['title', 'content', 'status']);
        try {
            const report = await Report.create(data);
            return response.status(201).json(report);
        }
        catch (error) {
            return response.status(400).json({ error: 'Failed to create report' });
        }
    }
    async status({ request, response }) {
        const status = request.input('status', '');
        try {
            const reports = await Report.query().where('status', status);
            return response.json(reports);
        }
        catch (error) {
            return response.status(500).json({ error: 'Failed to fetch reports by status' });
        }
    }
}
//# sourceMappingURL=reports_controller.js.map