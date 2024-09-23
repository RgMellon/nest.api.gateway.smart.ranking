import { Injectable, Logger } from '@nestjs/common';
import { ClientProxySmartRanking } from 'src/proxy/client-proxy';
import { CreateCategoryDto } from './dtos/create.categories.dto';
import { Observable } from 'rxjs';
import { UpdateCategories } from './dtos/update.categories.dto';

@Injectable()
export class CategoriesService {
  private logger = new Logger(CategoriesService.name);
  private clientAdminBackend =
    this.clientProxySmartRanking.getClientProxyAdminBackendInstance();
  constructor(private clientProxySmartRanking: ClientProxySmartRanking) {}

  createCategories(payload: CreateCategoryDto) {
    this.logger.log(
      `Recebendo chamada para criação de categoria ${JSON.stringify(payload)}`,
    );
    this.clientAdminBackend.emit('create-category', payload);
  }

  getAllCategories(id?: string): Observable<any> {
    this.logger.log(`Recebendo chamada para buscar categorias ${id}`);
    return this.clientAdminBackend.send('get-categories', id || '');
  }

  updateCategory(id: string, category: UpdateCategories) {
    this.logger.log(
      `Recebendo chamada para atualizar categoria ${id} com ${JSON.stringify(
        category,
      )}`,
    );

    return this.clientAdminBackend.emit('update-category', {
      id,
      category,
    });
  }
}
