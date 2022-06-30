import { Controller, Get, Param, Render } from '@nestjs/common';
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
}
