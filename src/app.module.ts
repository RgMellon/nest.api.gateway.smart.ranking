import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { CategoriesModule } from './categories/categories.module';
import { ChallengesModule } from './challenges/challenges.module';
import { ProxyRMQModule } from './proxy/proxy.module';
import { ConfigModule } from '@nestjs/config';
import { ClientProxySmartRanking } from './proxy/client-proxy';
import { RankingsModule } from './rankings/rankings.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PlayersModule,
    CategoriesModule,
    ChallengesModule,
    ProxyRMQModule,
    ConfigModule.forRoot({ isGlobal: true }),
    RankingsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [ClientProxySmartRanking],
})
export class AppModule {}
