export default function log ({ next, to }) {
    // need to remove
    if (!to) console.log(to)
    return next()
}
