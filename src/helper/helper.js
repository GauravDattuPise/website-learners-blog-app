
const bcrypt = require("bcrypt");

// function to hash password
exports.hashingPassword = (password) => {
    return bcrypt.hash(password, 10);
}

// function to compare password
exports.matchingPassword = (password, bcrytedPassword) => {
    return bcrypt.compare(password, bcrytedPassword);
}
