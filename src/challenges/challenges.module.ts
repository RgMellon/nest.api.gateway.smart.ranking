import { Module } from '@nestjs/common';
import { ChallengesController } from './challenges.controller';
import { ProxyRMQModule } from 'src/proxy/proxy.module';
import { ChallengesService } from './challenges.service';

@Module({
  imports: [ProxyRMQModule],
  controllers: [ChallengesController],
  providers: [ChallengesService],
})
export class ChallengesModule {}
