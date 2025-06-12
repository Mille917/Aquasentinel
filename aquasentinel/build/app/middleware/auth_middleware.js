/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
    /**
     * The URL to redirect to, when authentication fails
     */
    redirectTo = '/login';
    async handle(ctx, next, options = {}) {
        await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo });
        return next();
    }
}
