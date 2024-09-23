import {
  Body,
  Controller,
  Get,
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
import { CategoriesService } from './categories.service';

@Controller('api/v1')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post('categories')
  @UsePipes(ValidationPipe)
  async createCategories(@Body() req: CreateCategoryDto) {
    this.categoriesService.createCategories(req);
  }

  @Get('categories')
  getAllCategories(@Query('category') id: string): Observable<any> {
    return this.categoriesService.getAllCategories(id);
  }

  @Put('categories/:id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() category: UpdateCategories) {
    return this.categoriesService.updateCategory(id, category);
  }
}
