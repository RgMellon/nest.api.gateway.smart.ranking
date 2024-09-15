import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { PlayersModule } from './players/players.module';
import { CategoriesModule } from './categories/categories.module';
import { ChallengesModule } from './challenges/challenges.module';
import { ProxyRMQModule } from './proxy/proxy.module';
import { ConfigModule } from '@nestjs/config';
import { ClientProxySmartRanking } from './proxy/client-proxy';

@Module({
  imports: [
    PlayersModule,
    CategoriesModule,
    ChallengesModule,
    ProxyRMQModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [ClientProxySmartRanking],
})
export class AppModule {}
