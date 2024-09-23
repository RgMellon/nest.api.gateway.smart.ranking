import { Module } from '@nestjs/common';
import { RankingsController } from './rankings.controller';
import { ProxyRMQModule } from 'src/proxy/proxy.module';
import { RankingsService } from './rankings.service';

@Module({
  imports: [ProxyRMQModule],

  controllers: [RankingsController],

  providers: [RankingsService],
})
export class RankingsModule {}
