"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var oauth_service_1 = require('./oauth.service');
var AuthorizedRequestService = (function () {
    function AuthorizedRequestService(oauth, http) {
        this.oauth = oauth;
        this.http = http;
    }
    AuthorizedRequestService.prototype.get = function (url, query, oauthKey, oauthToken) {
        var _this = this;
        var authHeader = new http_1.Headers();
        authHeader.append('Authorization', this.oauth.createHeaderString('GET', url, query, oauthKey, oauthToken, this.oauth.createNonce(10), this.oauth.createTimestamp()));
        var requestUrl = url;
        var queryArray = [];
        Object.keys(query).forEach(function (k) {
            queryArray.push({
                key: _this.oauth.fixedEncodeURIComponent(k),
                val: _this.oauth.fixedEncodeURIComponent(query[k])
            });
        });
        if (queryArray.length > 0) {
            requestUrl += '?';
            requestUrl += queryArray.map(function (param) {
                return param.key + '=' + param.val;
            }).join('&');
        }
        return this.http.get(requestUrl, { headers: authHeader });
    };
    AuthorizedRequestService.prototype.post = function (url, params, oauthKey, oauthToken) {
        var _this = this;
        var authHeader = new http_1.Headers();
        authHeader.append('Content-Type', 'application/x-www-form-urlencoded');
        authHeader.append('Authorization', this.oauth.createHeaderString('POST', url, params, oauthKey, oauthToken, this.oauth.createNonce(10), this.oauth.createTimestamp()));
        var paramArray = [];
        Object.keys(params).forEach(function (k) {
            paramArray.push({
                key: _this.oauth.fixedEncodeURIComponent(k),
                val: _this.oauth.fixedEncodeURIComponent(params[k])
            });
        });
        paramArray = this.oauth.sortAlphabetically(paramArray);
        var body = paramArray.map(function (param) {
            return param.key + '=' + param.val;
        }).join('&');
        return this.http.post(url, body, { headers: authHeader });
    };
    AuthorizedRequestService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [oauth_service_1.OAuthService, http_1.Http])
    ], AuthorizedRequestService);
    return AuthorizedRequestService;
}());
exports.AuthorizedRequestService = AuthorizedRequestService;
//# sourceMappingURL=/home/sekita/dev/ng2-twitter/src/ng2-twitter-module/authorized-request.service.js.map