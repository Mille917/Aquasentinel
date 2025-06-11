import User from '#models/user';
import hash from '@adonisjs/core/services/hash';
import Alert from '#models/alert';
import Forecast from '#models/forecast';
import { countries } from 'countries-list';
export default class AuthController {
    async showLoginForm({ view }) {
        return view.render('auth/login');
    }
    async showRegisterForm({ view }) {
        const countryList = Object.entries(countries).map(([code, country]) => ({
            code,
            name: country.name,
            regions: country.regions ? Object.entries(country.regions).map(([regionCode, regionName]) => ({
                code: regionCode,
                name: regionName,
            })) : [],
        }));
        return view.render('auth/register', { countryList });
    }
    async login({ request, response, auth, session }) {
        const email = request.input('email');
        const password = request.input('password');
        if (!email || !password) {
            session.flash('error', 'Please, provide an email or password.');
            return response.redirect('/login');
        }
        try {
            const user = await User.findBy('email', email);
            if (!user) {
                session.flash('error', 'User not found.');
                return response.redirect('/login');
            }
            const isPasswordValid = await hash.verify(user.password, password);
            if (!isPasswordValid) {
                session.flash('error', 'Incorrect password.');
                return response.redirect('/login');
            }
            await auth.use('web').login(user);
            session.flash('success', 'You are now connected.');
            if (user.role === 'admin' || user.role === 'moderator') {
                return response.redirect('/dashboards/admin');
            }
            else {
                return response.redirect('/dashboards/public');
            }
        }
        catch (error) {
            console.error('Login error:', error);
            session.flash('error', 'An error occurred during login, please try again later.');
            return response.redirect('/login');
        }
    }
    async register({ request, response, auth, session }) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const username = request.input('username');
        const email = request.input('email');
        const password = request.input('password');
        const country = request.input('country');
        const region = request.input('region');
        const role = request.input('role') || 'user';
        const isAdmin = role === 'admin' || role === 'moderator';
        const isModerator = role === 'moderator';
        const isUser = role === 'Citizen';
        if (!country || !region) {
            session.flash('error', 'Country and region are required.');
            return response.redirect('/register');
        }
        if (!isAdmin && !isModerator && !isUser) {
            session.flash('error', 'Invalid role selected.');
            if (!username || !email || !password) {
                session.flash('error', 'Every field is required.');
                return response.redirect('/register');
            }
            if (!emailRegex.test(email)) {
                session.flash('error', 'Invalid email format.');
                return response.redirect('/register');
            }
            if (password.length < 6) {
                session.flash('error', 'Password must be at least 6 characters long.');
                return response.redirect('/register');
            }
            const existing = await User.query()
                .where('email', email)
                .orWhere('username', username)
                .first();
            if (existing) {
                session.flash('error', 'Email or username already exists.');
                return response.redirect('/register');
            }
            try {
                const user = await User.create({ username, email, password, country, region, role });
                await auth.use('web').login(user);
                session.flash('success', 'Account created successfully, you are now connected.');
                return response.redirect('/dashboards/admin');
            }
            catch (error) {
                console.error('Erreur inscription :', error);
                session.flash('error', 'An error occurred during registration, please try again later.');
                return response.redirect('/dashboards/public');
            }
        }
    }
    async logout({ auth, response }) {
        await auth.use('web').logout();
        return response.redirect('/login');
    }
    async showPublicDashboard({ view }) {
        const recentalerts = await Alert.query().select('id', 'message', 'region', 'alertType', 'created_at').orderBy('created_at', 'desc').limit(5).preload('forecast');
        const forecasts = await Forecast.query().orderBy('created_at', 'desc').limit(5);
        return view.render('dashboards/public', { recentalerts, forecasts });
    }
    async showDashboard({ auth, view }) {
        await auth.check();
        const user = auth.user;
        return view.render('dashboards/admin', { user });
    }
}
//# sourceMappingURL=auth_controller.js.map