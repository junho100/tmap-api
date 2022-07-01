import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

type markerType = {
  lat: number;
  lng: number;
};

function getDistanceFromLatLonInKm(
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

  async getFiltered(distance: number) {
    const newMarkers = [];
    for (let i = 0; i < 100; i++) {
      const dis =
        getDistanceFromLatLonInKm(
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
}
