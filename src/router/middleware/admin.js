const IS_ADMIN = true;
export default function admin({ next, router }) {
    if (!IS_ADMIN) {
        return router.push({ name: 'Dashboard' });
    }

    return next();
}
