import { Session } from '@/model/session/session.class';

export class SessionMapper {
  mapFromJson(json: string): Session {
    return JSON.parse(json) as Session;
  }
}
