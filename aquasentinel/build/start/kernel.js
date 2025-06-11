import router from '@adonisjs/core/services/router';
import server from '@adonisjs/core/services/server';
server.errorHandler(() => import('#exceptions/handler'));
server.use([
    () => import('#middleware/container_bindings_middleware'),
    () => import('@adonisjs/static/static_middleware'),
    () => import('@adonisjs/vite/vite_middleware'),
    () => import('@adonisjs/session/session_middleware'),
]);
router.use([
    () => import('@adonisjs/core/bodyparser_middleware'),
    () => import('@adonisjs/shield/shield_middleware'),
    () => import('@adonisjs/auth/initialize_auth_middleware')
]);
export const middleware = router.named({
    guest: () => import('#middleware/guest_middleware'),
    auth: () => import('#middleware/auth_middleware'),
    moderatorOrAdmin: () => import('#middleware/moderator_or_admin_middleware'),
    admin: () => import('#middleware/admin_middleware'),
});
//# sourceMappingURL=kernel.js.map