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

  @Get('/straight')
  @Render('straight')
  renderMarkers() {
    return this.appService.renderMarker();
  }

  @Get('/ped')
  @Render('ped')
  renderPedMarkers() {
    return this.appService.renderMarker();
  }

  @Get('/all')
  getAll() {
    return this.appService.getAll();
  }

  @Get('/straight/:distance')
  getFiltered(@Param('distance') distance: string) {
    return this.appService.getFiltered(parseInt(distance));
  }

  @Get('/ped/:distance')
  getPedFiltered(@Param('distance') distance: string) {
    return this.appService.getPedFiltered(parseInt(distance));
  }
}
