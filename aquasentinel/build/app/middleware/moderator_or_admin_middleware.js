export default class ModeratorOrAdminMiddleware {
    async handle({ auth, response }, next) {
        if (!auth || !(await auth.check())) {
            return response.unauthorized({ error: 'Unauthorized access' });
        }
        const user = auth.user;
        if (user.role !== 'admin' && user.role !== 'moderator') {
            return response.forbidden({ error: 'Access denied: Moderator or Admin only' });
        }
        return next();
    }
}
//# sourceMappingURL=moderator_or_admin_middleware.js.map