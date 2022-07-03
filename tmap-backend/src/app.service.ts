import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

type markerType = {
  lat: number;
  lng: number;
};

function sleep(delay) {
  const start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}

function getDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

@Injectable()
export class AppService {
  async getPedDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ): Promise<number> {
    const distanceOb = this.httpService.post(
      'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1',
      {
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
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          appKey: process.env.API_KEY,
        },
      },
    );
    try {
      const res = await firstValueFrom(distanceOb);
      return parseInt(res.data.features[0].properties.totalDistance);
    } catch (e) {
      console.log(e);
      return 100000;
    }
  }
  markers: Array<markerType>;
  center: markerType;
  constructor(private readonly httpService: HttpService) {
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
      } else {
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

  renderMarker() {
    return { key: process.env.API_KEY };
  }

  renderMarkers() {
    return { key: process.env.API_KEY };
  }

  getAll() {
    return this.markers;
  }

  getFiltered(distance: number) {
    const newMarkers = [];
    for (let i = 0; i < 100; i++) {
      const dis =
        getDistance(
          this.center.lat,
          this.center.lng,
          this.markers[i].lat,
          this.markers[i].lng,
        ) * 1000;
      if (dis <= distance) {
        newMarkers.push(this.markers[i]);
      }
    }
    return newMarkers;
  }

  async getPedFiltered(distance: number) {
    const newMarkers = [];
    for (let i = 0; i < 100; i++) {
      if ((i + 1) % 3 === 0) {
        sleep(2000);
      }
      const dis = await this.getPedDistance(
        this.center.lat,
        this.center.lng,
        this.markers[i].lat,
        this.markers[i].lng,
      );
      if (dis <= distance) {
        newMarkers.push(this.markers[i]);
      }
    }
    return newMarkers;
  }

  testCode() {
    return this.httpService.post(
      'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1',
      {
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
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          appKey: process.env.API_KEY,
        },
      },
    );
  }
}
