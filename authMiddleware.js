const jwt = require('jsonwebtoken');

async function authMiddleware(req, res, next) {
    const token = req.headers.token;
    if(!token) {
        return res.status(401).json({ message: 'not logged in' });
    }
    try{
        const decoded = jwt.verify(token, 'nixon123');
        const username = decoded.username;

        if(!username) {
            res.status(403).json({ message: 'Invalid token' });
            return;
        }
        req.username = username;
        next();

    } catch (error) {
        return res.status(401).json({ message: 'error 404' });
    }
}

module.exports = authMiddleware;