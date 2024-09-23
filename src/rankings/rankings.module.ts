import { Module } from '@nestjs/common';
import { RankingsController } from './rankings.controller';
import { ProxyRMQModule } from 'src/proxy/proxy.module';

@Module({
  imports: [ProxyRMQModule],

  controllers: [RankingsController],
})
export class RankingsModule {}
