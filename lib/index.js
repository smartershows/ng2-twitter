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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./sha1.service'));
__export(require('./oauth.service'));
__export(require('./authorized-request.service'));
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var sha1_service_2 = require('./sha1.service');
var oauth_service_2 = require('./oauth.service');
var authorized_request_service_2 = require('./authorized-request.service');
// export var Ng2TwitterService = [
// 	{
// 		provide: Sha1Service
// 	},
// 	{
// 		provide: OAuthService
// 	},
// 	{
// 		provide: AuthorizedRequestService
// 	},
// ];
var Ng2TwitterModule = (function () {
    function Ng2TwitterModule() {
    }
    Ng2TwitterModule = __decorate([
        core_1.NgModule({
            imports: [http_1.HttpModule],
            providers: [sha1_service_2.Sha1Service, oauth_service_2.OAuthService, authorized_request_service_2.AuthorizedRequestService]
        }), 
        __metadata('design:paramtypes', [])
    ], Ng2TwitterModule);
    return Ng2TwitterModule;
}());
exports.Ng2TwitterModule = Ng2TwitterModule;
//# sourceMappingURL=/home/sekita/dev/ng2-twitter/src/ng2-twitter-module/index.js.map