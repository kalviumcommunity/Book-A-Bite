const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET

const user = require("../database/user");

modeule.exports = async (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth) {
        return res.status(401).json({ message: "You must be logged in" });
    }

    const token = auth.replace("Bearer ", "");
    jwt.verify(token, SECRET, (err, payload) => {
        if(err){
            return res.status(401).json({ message: "You must be logged in" });
        }
        const { id } = payload;
        user.CheckExistingUser(id)
        .then((userData) => {
            req.user = userData;
            next();
        })
    })
}
