const bcrypt = require('bcrypt');

const hashedPassword = async (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if(err) {
                return reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });

    });

}

const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}

module.exports = {
    hashedPassword,
    comparePassword
};