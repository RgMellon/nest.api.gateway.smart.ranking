import { Controller, Get, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RankingsService } from './rankings.service';

@Controller('api/v1/rankings')
export class RankingsController {
  constructor(private rankingService: RankingsService) {}

  @Get()
  getRankings(
    @Query('category') category: string,
    @Query('dateRef') dateRef: string,
  ): Observable<any> {
    return this.rankingService.getRankings(category, dateRef);
  }
}
