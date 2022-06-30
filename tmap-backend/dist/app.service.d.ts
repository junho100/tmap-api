import { HttpService } from '@nestjs/axios';
declare type markerType = {
    lat: number;
    lng: number;
};
export declare class AppService {
    private readonly httpService;
    markers: Array<markerType>;
    center: markerType;
    constructor(httpService: HttpService);
    renderMarker(): {
        key: string;
    };
    renderMarkers(): {
        key: string;
    };
    getAll(): markerType[];
    getFiltered(distance: number): void;
}
export {};
