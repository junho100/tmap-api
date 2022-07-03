import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    renderMarker(): {
        key: string;
    };
    renderMarkers(): {
        key: string;
    };
    getAll(): {
        lat: number;
        lng: number;
    }[];
    getFiltered(distance: string): any[];
    getPedFiltered(distance: string): Promise<any[]>;
    testCode(): void;
}
