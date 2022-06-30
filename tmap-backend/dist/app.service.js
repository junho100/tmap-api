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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    constructor(httpService) {
        this.httpService = httpService;
        this.center = {
            lat: 37.566481622437934,
            lng: 126.98502302169841,
        };
        this.markers = [];
        for (let i = 0; i < 100; i++) {
            const lat = Math.random() / 100 + 37.56368;
            const lng = Math.random() / 100 + 126.976433;
            const marker = {
                lat,
                lng,
            };
            this.markers.push(marker);
        }
    }
    renderMarker() {
        return { key: process.env.API_KEY };
    }
    renderMarkers() {
        return { key: process.env.API_KEY };
    }
    getAll() {
        return this.markers;
    }
    getFiltered(distance) {
        const newMarkers = [];
        for (let i = 0; i < 100; i++) {
            const d = this.httpService.get('"https://apis.openapi.sk.com/tmap/routes/distance?version=1&format=json&callback=result', {
                data: {
                    appKey: process.env.API_KEY,
                    startX: String(this.center.lat),
                    startY: String(this.center.lng),
                    endX: String(this.markers[i].lat),
                    endY: String(this.markers[i].lng),
                    reqCoordType: 'WGS84GEO',
                },
            });
            console.log(JSON.stringify(d));
        }
        return;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map