export default class AdminMiddleware {
    async handle({ auth, response }, next) {
        const user = auth.user;
        if (user && user.role === 'admin') {
            return await next();
        }
        return response.unauthorized({ message: 'Accès réservé aux administrateurs.' });
    }
}
//# sourceMappingURL=admin_middleware.js.map