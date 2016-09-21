module.exports = function(username, password) {
    return function(req, res, next) {
        console.log(username,password);
        next();
    }
};