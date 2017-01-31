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
var sha1_service_1 = require('./sha1.service');
var OAuthService = (function () {
    function OAuthService(sha1) {
        this.sha1 = sha1;
    }
    /**
     * Authorizing a request
     * https://dev.twitter.com/oauth/overview/authorizing-requests
     */
    OAuthService.prototype.createHeaderString = function (httpMethod, baseURL, requestParams, oauthKey, oauthToken, nonce, timestamp) {
        var headerStringArray = this.createParameterStringArray({}, oauthKey, oauthToken, nonce, timestamp);
        headerStringArray.push({
            key: 'oauth_signature',
            val: this.fixedEncodeURIComponent(this.createSignature(httpMethod, baseURL, requestParams, oauthKey, oauthToken, nonce, timestamp))
        });
        headerStringArray = this.sortAlphabetically(headerStringArray);
        return 'OAuth ' + headerStringArray.map(function (param) {
            return param.key + '="' + param.val + '"';
        }).join(', ');
    };
    OAuthService.prototype.createTimestamp = function () {
        return '' + Math.floor(((new Date()).getTime()) / 1000);
    };
    OAuthService.prototype.createNonce = function (length) {
        var nonceChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var result = '';
        for (var i = 0; i < length; ++i) {
            var rnum = Math.floor(Math.random() * nonceChars.length);
            result += nonceChars.substring(rnum, rnum + 1);
        }
        return result;
    };
    /**
     * Creating a signature
     * https://dev.twitter.com/oauth/overview/creating-signatures
     */
    OAuthService.prototype.createSignature = function (httpMethod, baseURL, requestParams, oauthKey, oauthToken, nonce, timestamp) {
        return this.calculateSignature(this.createSigningKey(oauthKey, oauthToken), this.createSignatureBaseString(httpMethod, baseURL, this.createParameterString(requestParams, oauthKey, oauthToken, nonce, timestamp)));
    };
    OAuthService.prototype.calculateSignature = function (signingKey, signatureBaseString) {
        return this.sha1.getHash(signingKey, signatureBaseString);
    };
    OAuthService.prototype.createSigningKey = function (oauthKey, oauthToken) {
        return oauthKey.consumerSecret + '&' + oauthToken.tokenSecret;
    };
    OAuthService.prototype.createSignatureBaseString = function (httpMethod, baseURL, parameterString) {
        return httpMethod + '&' + this.fixedEncodeURIComponent(baseURL) + '&' + this.fixedEncodeURIComponent(parameterString);
    };
    OAuthService.prototype.createParameterString = function (requestParams, oauthKey, oauthToken, nonce, timestamp) {
        var encodedParams = this.createParameterStringArray(requestParams, oauthKey, oauthToken, nonce, timestamp);
        encodedParams = this.sortAlphabetically(encodedParams);
        return encodedParams.map(function (param) {
            return param.key + '=' + param.val;
        }).join('&');
    };
    OAuthService.prototype.createParameterStringArray = function (requestParams, oauthKey, oauthToken, nonce, timestamp) {
        var _this = this;
        var encodedParams = [];
        Object.keys(requestParams).forEach(function (k) {
            encodedParams.push({
                key: _this.fixedEncodeURIComponent(k),
                val: _this.fixedEncodeURIComponent(requestParams[k])
            });
        });
        encodedParams.push({
            key: this.fixedEncodeURIComponent('oauth_consumer_key'),
            val: this.fixedEncodeURIComponent(oauthKey.consumerKey)
        }, {
            key: this.fixedEncodeURIComponent('oauth_signature_method'),
            val: this.fixedEncodeURIComponent('HMAC-SHA1')
        }, {
            key: this.fixedEncodeURIComponent('oauth_nonce'),
            val: this.fixedEncodeURIComponent(nonce)
        }, {
            key: this.fixedEncodeURIComponent('oauth_timestamp'),
            val: this.fixedEncodeURIComponent(timestamp)
        }, {
            key: this.fixedEncodeURIComponent('oauth_token'),
            val: this.fixedEncodeURIComponent(oauthToken.token)
        }, {
            key: this.fixedEncodeURIComponent('oauth_version'),
            val: this.fixedEncodeURIComponent('1.0')
        });
        return encodedParams;
    };
    OAuthService.prototype.sortAlphabetically = function (params) {
        params.sort(function (a, b) {
            if (a.key > b.key)
                return 1;
            if (a.key < b.key)
                return -1;
            else
                return 0;
        });
        return params;
    };
    OAuthService.prototype.fixedEncodeURIComponent = function (str) {
        return encodeURIComponent(str)
            .replace(/[!'()*]/g, function (c) {
            return '%' + c.charCodeAt(0).toString(16);
        });
        // .replace('%20', function(c) {
        // 	return '%2520';
        // });
    };
    OAuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [sha1_service_1.Sha1Service])
    ], OAuthService);
    return OAuthService;
}());
exports.OAuthService = OAuthService;
//# sourceMappingURL=/home/sekita/dev/ng2-twitter/src/ng2-twitter-module/oauth.service.js.map