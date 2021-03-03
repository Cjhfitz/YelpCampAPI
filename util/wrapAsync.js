// returns a new function
// executes function passed and adds .catch() and handles error
module.exports = function wrapAsync(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch(err => next(err));
    }
};