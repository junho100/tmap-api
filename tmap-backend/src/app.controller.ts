import { Controller, Get, Param, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  renderMarker() {
    return this.appService.renderMarker();
  }

  @Get('/filter')
  @Render('filter')
  renderMarkers() {
    return this.appService.renderMarkers();
  }

  @Get('/all')
  getAll() {
    return this.appService.getAll();
  }

  @Get('/all/:distance')
  getFiltered(@Param('distance') distance: string) {
    return this.appService.getFiltered(parseInt(distance));
  }

  @Get('/ped/:distance')
  getPedFiltered(@Param('distance') distance: string) {
    return this.appService.getPedFiltered(parseInt(distance));
  }

  @Get('/test')
  testCode() {
    const results = this.appService.testCode();
    results.forEach((res) => {
      const rs = res.data.features;
      rs.forEach((r) => {
        if (r.properties.totalDistance) {
          console.log(r.properties.totalDistance);
        } else {
          return false;
        }
      });
    });
    return;
  }
}
