import { Session } from '@/model/sessions/Session.class';

export class SessionMapper {
  mapFromJson(json: string): Session {
    return JSON.parse(json) as Session;
  }
}
