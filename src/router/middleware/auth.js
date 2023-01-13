const IS_AUTH = true
export default function auth({ next, router }) {
    if (!IS_AUTH) {
        return router.push({ name: 'Login' });
    }

    return next();
}
