class CreateCode {
    static String(length = 10, chars = [...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789']) {
        return [...Array(length)].map(() => chars[Math.random() * chars.length | 0]).join('');
    }
}
module.exports = CreateCode;