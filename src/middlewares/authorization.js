const jwt = require('jsonwebtoken');
const accessTokenSecret = 'Y$1^@#%^&Q1';

const middlewares = () => {
    const isAuthenticated = (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, accessTokenSecret, (err, user) => {
                if (err) {
                    return res.status(403).json({ status: false, message: "Unauthorized" });
                }

                req.user = user;
                next();
            });
        } else {
            res.sendStatus(401);
        }
    };
    return { isAuthenticated }
}
module.exports = middlewares();