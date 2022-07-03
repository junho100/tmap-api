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
const rxjs_1 = require("rxjs");
function sleep(delay) {
    const start = new Date().getTime();
    while (new Date().getTime() < start + delay)
        ;
}
function getDistance(lat1, lng1, lat2, lng2) {
    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lng2 - lng1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
}
let AppService = class AppService {
    constructor(httpService) {
        this.httpService = httpService;
        this.center = {
            lat: 37.566481622437934,
            lng: 126.98502302169841,
        };
        this.markers = [];
        for (let i = 1; i < 101; i++) {
            if (i % 2 == 0) {
                const lat = 37.56368 + Math.random() / 100;
                const lng = 126.976433 + Math.random() / 100;
                const marker = {
                    lat,
                    lng,
                };
                this.markers.push(marker);
            }
            else {
                const lat = 37.56368 - Math.random() / 100;
                const lng = 126.976433 - Math.random() / 100;
                const marker = {
                    lat,
                    lng,
                };
                this.markers.push(marker);
                if (i === 1) {
                    console.log(marker);
                }
            }
        }
    }
    async getPedDistance(lat1, lng1, lat2, lng2) {
        const distanceOb = this.httpService.post('https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1', {
            angle: 0,
            speed: 0,
            reqCoordType: 'WGS84GEO',
            searchOption: '0',
            resCoordType: 'WGS84GEO',
            sort: 'index',
            startX: lng1,
            startY: lat1,
            endX: lng2,
            endY: lat2,
            startName: 'home',
            endName: 'taget',
        }, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                appKey: process.env.API_KEY,
            },
        });
        try {
            const res = await (0, rxjs_1.firstValueFrom)(distanceOb);
            return parseInt(res.data.features[0].properties.totalDistance);
        }
        catch (e) {
            console.log(e);
            return 100000;
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
            const dis = getDistance(this.center.lat, this.center.lng, this.markers[i].lat, this.markers[i].lng) * 1000;
            if (dis <= distance) {
                newMarkers.push(this.markers[i]);
            }
        }
        return newMarkers;
    }
    async getPedFiltered(distance) {
        const newMarkers = [];
        for (let i = 0; i < 100; i++) {
            if ((i + 1) % 3 === 0) {
                sleep(2000);
            }
            const dis = await this.getPedDistance(this.center.lat, this.center.lng, this.markers[i].lat, this.markers[i].lng);
            if (dis <= distance) {
                newMarkers.push(this.markers[i]);
            }
        }
        return newMarkers;
    }
    testCode() {
        return this.httpService.post('https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1', {
            angle: 0,
            speed: 0,
            reqCoordType: 'WGS84GEO',
            searchOption: '0',
            resCoordType: 'WGS84GEO',
            sort: 'index',
            startX: 126.98502302169841,
            startY: 37.566481622437934,
            endX: 126.97375839798819,
            endY: 37.55535311812612,
            startName: 'home',
            endName: 'test',
        }, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                appKey: process.env.API_KEY,
            },
        });
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map