import { HttpService } from '@nestjs/axios';
declare type markerType = {
    lat: number;
    lng: number;
};
export declare class AppService {
    private readonly httpService;
    getPedDistance(lat1: number, lng1: number, lat2: number, lng2: number): Promise<number>;
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
    getFiltered(distance: number): any[];
    getPedFiltered(distance: number): Promise<any[]>;
    testCode(): import("rxjs").Observable<import("axios").AxiosResponse<any, any>>;
}
export {};
