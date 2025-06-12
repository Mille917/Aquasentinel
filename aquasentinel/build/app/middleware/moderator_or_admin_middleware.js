export default class ModeratorOrAdminMiddleware {
    async handle({ auth, response }, next) {
        // Vérifie que le système d’authentification est prêt et que l’utilisateur est connecté
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
