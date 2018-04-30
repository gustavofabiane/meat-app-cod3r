"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (user) {
        return user !== undefined &&
            this.email === user.email &&
            this.password === user.password;
    };
    return User;
}());
exports.User = User;
exports.users = {
    "chuchuzinho@gmail.com": new User('chuchuzinho@gmail.com', 'Chuchu', 'tete123'),
    "lilinda@gmail.com": new User('lilinda@gmail.com', 'Lilinda', 'tete123'),
    "momozao@gmail.com": new User('momozao@gmail.com', 'Gustavo', 'tete123')
};
