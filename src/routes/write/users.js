"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var express_1 = require("express");
var middleware_1 = require("../../middleware");
var controllers_1 = require("../../controllers");
var helpers_1 = require("../helpers");
var setupApiRoute = helpers_1["default"].setupApiRoute;
var router = (0, express_1.Router)();
// function guestRoutes(): void {
//     // like registration, login...
// }
function authenticatedRoutes() {
    var middlewares = [middleware_1["default"].ensureLoggedIn];
    setupApiRoute(router, 'post', '/', __spreadArray(__spreadArray([], middlewares, true), [middleware_1["default"].checkRequired.bind(null, ['username'])], false), controllers_1["default"].write.users.create);
    setupApiRoute(router, 'delete', '/', __spreadArray(__spreadArray([], middlewares, true), [middleware_1["default"].checkRequired.bind(null, ['uids'])], false), controllers_1["default"].write.users.deleteMany);
    setupApiRoute(router, 'head', '/:uid', [middleware_1["default"].assert.user], controllers_1["default"].write.users.exists);
    setupApiRoute(router, 'get', '/:uid', __spreadArray(__spreadArray([], middlewares, true), [middleware_1["default"].assert.user], false), controllers_1["default"].write.users.get);
    setupApiRoute(router, 'put', '/:uid', __spreadArray(__spreadArray([], middlewares, true), [middleware_1["default"].assert.user], false), controllers_1["default"].write.users.update);
    setupApiRoute(router, 'delete', '/:uid', __spreadArray(__spreadArray([], middlewares, true), [middleware_1["default"].assert.user], false), controllers_1["default"].write.users["delete"]);
    setupApiRoute(router, 'put', '/:uid/picture', __spreadArray(__spreadArray([], middlewares, true), [middleware_1["default"].assert.user], false), controllers_1["default"].write.users.changePicture);
    setupApiRoute(router, 'delete', '/:uid/content', __spreadArray(__spreadArray([], middlewares, true), [middleware_1["default"].assert.user], false), controllers_1["default"].write.users.deleteContent);
    setupApiRoute(router, 'delete', '/:uid/account', __spreadArray(__spreadArray([], middlewares, true), [middleware_1["default"].assert.user], false), controllers_1["default"].write.users.deleteAccount);
    setupApiRoute(router, 'put', '/:uid/settings', __spreadArray(__spreadArray([], middlewares, true), [middleware_1["default"].checkRequired.bind(null, ['settings'])], false), controllers_1["default"].write.users.updateSettings);
    setupApiRoute(router, 'put', '/:uid/password', __spreadArray(__spreadArray([], middlewares, true), [middleware_1["default"].checkRequired.bind(null, ['newPassword']), middleware_1["default"].assert.user], false), controllers_1["default"].write.users.changePassword);
    setupApiRoute(router, 'put', '/:uid/follow', __spreadArray(__spreadArray([], middlewares, true), [middleware_1["default"].assert.user], false), controllers_1["default"].write.users.follow);
    setupApiRoute(router, 'delete', '/:uid/follow', __spreadArray(__spreadArray([], middlewares, true), [middleware_1["default"].assert.user], false), controllers_1["default"].write.users.unfollow);
    setupApiRoute(router, 'put', '/:uid/ban', __spreadArray(__spreadArray([], middlewares, true), [middleware_1["default"].assert.user], false), controllers_1["default"].write.users.ban);
    setupApiRoute(router, 'delete', '/:uid/ban', __spreadArray(__spreadArray([], middlewares, true), [middleware_1["default"].assert.user], false), controllers_1["default"].write.users.unban);
    setupApiRoute(router, 'put', '/:uid/mute', __spreadArray(__spreadArray([], middlewares, true), [middleware_1["default"].assert.user], false), controllers_1["default"].write.users.mute);
    setupApiRoute(router, 'delete', '/:uid/mute', __spreadArray(__spreadArray([], middlewares, true), [middleware_1["default"].assert.user], false), controllers_1["default"].write.users.unmute);
    setupApiRoute(router, 'post', '/:uid/tokens', __spreadArray(__spreadArray([], middlewares, true), [middleware_1["default"].assert.user], false), controllers_1["default"].write.users.generateToken);
    setupApiRoute(router, 'delete', '/:uid/tokens/:token', __spreadArray(__spreadArray([], middlewares, true), [middleware_1["default"].assert.user], false), controllers_1["default"].write.users.deleteToken);
    setupApiRoute(router, 'delete', '/:uid/sessions/:uuid', __spreadArray(__spreadArray([], middlewares, true), [middleware_1["default"].assert.user], false), controllers_1["default"].write.users.revokeSession);
    setupApiRoute(router, 'post', '/:uid/invites', middlewares, controllers_1["default"].write.users.invite);
    setupApiRoute(router, 'get', '/:uid/invites/groups', __spreadArray(__spreadArray([], middlewares, true), [middleware_1["default"].assert.user], false), controllers_1["default"].write.users.getInviteGroups);
    setupApiRoute(router, 'get', '/:uid/emails', __spreadArray(__spreadArray([], middlewares, true), [middleware_1["default"].assert.user], false), controllers_1["default"].write.users.listEmails);
    setupApiRoute(router, 'get', '/:uid/emails/:email', __spreadArray(__spreadArray([], middlewares, true), [middleware_1["default"].assert.user], false), controllers_1["default"].write.users.getEmail);
    setupApiRoute(router, 'post', '/:uid/emails/:email/confirm', __spreadArray(__spreadArray([], middlewares, true), [middleware_1["default"].assert.user], false), controllers_1["default"].write.users.confirmEmail);
    setupApiRoute(router, 'head', '/:uid/exports/:type', __spreadArray(__spreadArray([], middlewares, true), [middleware_1["default"].assert.user, middleware_1["default"].checkAccountPermissions], false), controllers_1["default"].write.users.checkExportByType);
    setupApiRoute(router, 'get', '/:uid/exports/:type', __spreadArray(__spreadArray([], middlewares, true), [middleware_1["default"].assert.user, middleware_1["default"].checkAccountPermissions], false), controllers_1["default"].write.users.getExportByType);
    setupApiRoute(router, 'post', '/:uid/exports/:type', __spreadArray(__spreadArray([], middlewares, true), [middleware_1["default"].assert.user, middleware_1["default"].checkAccountPermissions], false), controllers_1["default"].write.users.generateExportsByType);
    // Shorthand route to access user routes by userslug
    router.all('/+bySlug/:userslug*?', [], controllers_1["default"].write.users.redirectBySlug);
}
function default_1() {
    authenticatedRoutes();
    return router;
}
exports["default"] = default_1;
