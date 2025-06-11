import type { HttpContext } from '@adonisjs/core/http'
import Report from '#models/report'

// Import VineJS validators
import { createReportValidator, updateReportValidator } from '#validators/report'

export default class ReportsController {
  public async index({ response }: HttpContext) {
    try {
      const reports = await Report.all()
      return response.json(reports)
    } catch (error) {
      return response.status(500).json({ error: 'Failed to fetch reports' })
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const report = await Report.findOrFail(params.id)
      return response.json(report)
    } catch (error) {
      return response.status(404).json({ error: 'Report not found' })
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const report = await Report.findOrFail(params.id)
      await report.delete()
      return response.json({ message: 'Report deleted successfully' })
    } catch (error) {
      return response.status(404).json({ error: 'Report not found' })
    }
  }

  public async update({ params, request, response }: HttpContext) {
    try {
      const report = await Report.findOrFail(params.id)

      // Validate request using VineJS
      const payload = await request.validateUsing(updateReportValidator)

      report.merge(payload)
      await report.save()
      return response.json(report)
    } catch (error) {
      return response.status(404).json({ error: 'Report not found' })
    }
  }

  public async store({ request, response }: HttpContext) {
    try {
      // Validate request using VineJS
      const payload = await request.validateUsing(createReportValidator)

      const report = await Report.create(payload)
      return response.status(201).json(report)
    } catch (error) {
      return response.status(400).json({ error: 'Failed to create report' })
    }
  }

  public async status({ request, response }: HttpContext) {
    try {
      const status = request.input('status', '')
      const reports = await Report.query().where('status', status)
      return response.json(reports)
    } catch (error) {
      return response.status(500).json({ error: 'Failed to fetch reports by status' })
    }
  }
}