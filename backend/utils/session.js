import session from 'express-session';
import crypto from 'crypto';

export const generateUserId = () => {
    return crypto.randomBytes(16).toString('hex');
}

export const sessionConfig = session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
});
