/**
 * Guest middleware is used to deny access to routes that should
 * be accessed by unauthenticated users.
 *
 * For example, the login page should not be accessible if the user
 * is already logged-in
 */
export default class GuestMiddleware {
    /**
     * The URL to redirect to when user is logged-in
     */
    redirectTo = '/';
    async handle(ctx, next, options = {}) {
        for (let guard of options.guards || [ctx.auth.defaultGuard]) {
            if (await ctx.auth.use(guard).check()) {
                return ctx.response.redirect(this.redirectTo, true);
            }
        }
        return next();
    }
}
