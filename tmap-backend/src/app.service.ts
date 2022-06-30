import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

type markerType = {
  lat: number;
  lng: number;
};

@Injectable()
export class AppService {
  markers: Array<markerType>;
  center: markerType;
  constructor(private readonly httpService: HttpService) {
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

  getFiltered(distance: number) {
    const newMarkers = [];
    for (let i = 0; i < 100; i++) {
      const d = this.httpService.get(
        '"https://apis.openapi.sk.com/tmap/routes/distance?version=1&format=json&callback=result',
        {
          data: {
            appKey: process.env.API_KEY,
            startX: String(this.center.lat),
            startY: String(this.center.lng),
            endX: String(this.markers[i].lat),
            endY: String(this.markers[i].lng),
            reqCoordType: 'WGS84GEO',
          },
        },
      );
      console.log(JSON.stringify(d));
    }
    return;
  }
}
