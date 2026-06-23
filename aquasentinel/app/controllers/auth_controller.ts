import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import Alert from '#models/alert'
import Forecast from '#models/forecast'
import { countries } from 'countries-list'

// Import VineJS validators
import { loginValidator, registerValidator } from '#validators/auth'

export default class AuthController {
  public async showLoginForm({ view }: HttpContext) {
    return view.render('auth/login')
  }

  public async showRegisterForm({ view }: HttpContext) {
    const countryList = Object.entries(countries).map(([code, country]) => ({
      code,
      name: country.name,
      regions: (country as any).regions
        ? Object.entries((country as any).regions).map(([regionCode, regionName]) => ({
            code: regionCode,
            name: regionName,
          }))
        : [],
    }))

    return view.render('auth/register', { countryList })
  }

  public async login({ request, response, auth, session }: HttpContext) {
    const payload = await request.validateUsing(loginValidator)

    try {
      const user = await User.findBy('email', payload.email)
      if (!user || !(await hash.verify(user.password, payload.password))) {
        session.flash('error', 'Invalid credentials.')
        return response.redirect('/login')
      }

      await auth.use('web').login(user)
      session.flash('success', 'You are now connected.')

      return response.redirect(user.role === 'admin' || user.role === 'moderator' ? '/dashboards/admin' : '/dashboards/public')
    } catch (error) {
      console.error('Login error:', error)
      session.flash('error', 'An error occurred during login, please try again later.')
      return response.redirect('/login')
    }
  }

  public async register({ request, response, auth, session }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const existingUser = await User.query().where('email', payload.email).orWhere('username', payload.username).first()
    if (existingUser) {
      session.flash('error', 'Email or username already exists.')
      return response.redirect('/register')
    }

    try {
      const user = await User.create(payload)
      await auth.use('web').login(user)
      session.flash('success', 'Account created successfully.')
      return response.redirect('/dashboards/public')
    } catch (error) {
      console.error('Registration error:', error)
      session.flash('error', 'An error occurred during registration, please try again later.')
      return response.redirect('/register')
    }
  }

  public async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/login')
  }

  public async showPublicDashboard({ view }: HttpContext) {
    const recentalerts = await Alert.query().select('id', 'message', 'region', 'alertType', 'created_at').orderBy('created_at', 'desc').limit(5).preload('forecast')
    const forecasts = await Forecast.query().orderBy('created_at', 'desc').limit(5)
    return view.render('dashboards/public', { recentalerts, forecasts })
  }

  public async showDashboard({ auth, view }: HttpContext) {
    await auth.check()
    return view.render('dashboards/admin', { user: auth.user })
  }
}
