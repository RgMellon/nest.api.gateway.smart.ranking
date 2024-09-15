import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { ProxyRMQModule } from 'src/proxy/proxy.module';

@Module({
  imports: [ProxyRMQModule],
  controllers: [CategoriesController],
  providers: [],
})
export class CategoriesModule {}
