import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxySmartRanking } from 'src/proxy/client-proxy';

@Injectable()
export class RankingsService {
  private clientRankingProxy =
    this.clientProxySmartRanking.getClientProxyRankingInstance();

  constructor(private clientProxySmartRanking: ClientProxySmartRanking) {}

  getRankings(category: string, dateRef: string): Observable<any> {
    if (!category) {
      throw new Error('Category is required');
    }

    return this.clientRankingProxy.send('get-ranking', {
      category,
      dateRef: dateRef || null,
    });
  }
}
