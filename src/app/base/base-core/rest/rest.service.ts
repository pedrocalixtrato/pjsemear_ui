import {BaseCoreModule} from '../base-core.module';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: BaseCoreModule
})
export class RestService {

  constructor(
  ) {}

  /**
   * Builds the full url, for example:
   *
   * 'resource/34' => 'http://localhost:4200/resource/34'
   *
   * In the case of unsecured routes such as 'login' the
   * fragment 'psec' is not present.
   */
  buildFullUrl(route: string, unsecure: boolean = false): string {
    return null;
  }

}


