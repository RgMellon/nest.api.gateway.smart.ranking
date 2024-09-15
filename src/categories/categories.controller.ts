import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateCategoryDto } from './dtos/create.categories.dto';
import { Observable } from 'rxjs';
import { UpdateCategories } from './dtos/update.categories.dto';
import { ClientProxySmartRanking } from '../proxy/client-proxy';

@Controller('api/v1')
export class CategoriesController {
  private logger = new Logger(CategoriesController.name);

  constructor(private clientProxySmartRanking: ClientProxySmartRanking) {}

  private clientAdminBackend =
    this.clientProxySmartRanking.getClientProxyAdminBackendInstance();

  @Post('categories')
  @UsePipes(ValidationPipe)
  async createCategories(@Body() req: CreateCategoryDto) {
    this.clientAdminBackend.emit('create-category', req);
  }

  @Get('categories')
  getAllCategories(@Query('category') id: string): Observable<any> {
    return this.clientAdminBackend.send('get-categories', id || '');
  }

  @Put('categories/:id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() category: UpdateCategories) {
    console.log('update');
    return this.clientAdminBackend.emit('update-category', {
      id,
      category,
    });
  }
}
