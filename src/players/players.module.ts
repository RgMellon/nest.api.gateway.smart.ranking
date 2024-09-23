import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { ProxyRMQModule } from 'src/proxy/proxy.module';
import { PlayersService } from './players.service';

@Module({
  imports: [ProxyRMQModule],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
