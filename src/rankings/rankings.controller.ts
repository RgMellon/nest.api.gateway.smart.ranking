import { Controller, Get, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxySmartRanking } from 'src/proxy/client-proxy';

@Controller('api/v1/rankings')
export class RankingsController {
  private clientRankingProxy =
    this.clientProxySmartRanking.getClientProxyRankingInstance();

  constructor(private clientProxySmartRanking: ClientProxySmartRanking) {}

  @Get()
  getRankings(
    @Query('category') category: string,
    @Query('dateRef') dateRef: string,
  ): Observable<any> {
    if (!category) {
      throw new Error('Category is required');
    }

    return this.clientRankingProxy.send('get-ranking', {
      category,
      dateRef: dateRef || null,
    });
  }
}
