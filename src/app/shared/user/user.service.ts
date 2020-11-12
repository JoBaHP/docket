import * as fromRoot from "../../app.reducer";

import { ErrorHandlingService } from "../error-handling/error-handling.service";
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { RestService } from "../rest/rest.service";
import { StatusBarService } from "../../status-bar/status-bar.service";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs/Subject";
import { UserModel } from "./user.interface";
import { environment } from "../../../environments/environment";

@Injectable()
export class UserService {
  private jsonHeaders;
  constructor(
    private _http: Http,
    private _store: Store<fromRoot.State>,
    private _statusBarService: StatusBarService,
    private _restService: RestService,
    private _errorHandlingService: ErrorHandlingService
  ) {
    this.jsonHeaders = this._restService.getJsonHeaders();
  }

  postUser(user: UserModel) {
    return this._http
      .post(`${environment.sailsApi}/signup`, user, this.jsonHeaders)
      .map(res => {
        try {
          // ensure that there cannot be any brackets '<' '>' in the json
          return res.json() || {};
        } catch (err) {
          this._statusBarService.setStatus(err, "error");
        }
      })
      .catch(e => {
        return this._errorHandlingService.errorHandler(e);
      });
  }

  updateUser(userId: string, checklistId: string) {
    const authHeaders = this._restService.getAuthHeaders();

    return this._http
      .put(
        `${environment.sailsApi}/user/${userId}/addchecklist`,
        { checklistId },
        authHeaders
      )
      .map(res => {
        try {
          // ensure that there cannot be any brackets '<' '>' in the json
          return res.json() || {};
        } catch (err) {
          this._statusBarService.setStatus(err, "error");
        }
      })
      .catch(e => {
        return this._errorHandlingService.errorHandler(e);
      });
  }

  getUsersChecklists(userId: string) {
    const authHeaders = this._restService.getAuthHeaders();

    return this._http
      .get(`${environment.sailsApi}/user/${userId}/checklist`, authHeaders)
      .map(res => {
        try {
          // ensure that there cannot be any brackets '<' '>' in the json
          return res.json() || {};
        } catch (err) {
          this._statusBarService.setStatus(err, "error");
        }
      })
      .catch(e => {
        return this._errorHandlingService.errorHandler(e);
      });
  }

  loginUser(user: UserModel) {
    return this._http
      .post(`${environment.sailsApi}/login`, user, this.jsonHeaders)
      .map(res => {
        try {
          // ensure that there cannot be any brackets '<' '>' in the json
          const cleanedResult = res.text().replace(/<\/?[^>]+(>|$)/g, "");
          return JSON.parse(cleanedResult) || {};
        } catch (err) {
          this._statusBarService.setStatus(err, "error");
        }
      })
      .catch(e => {
        return this._errorHandlingService.errorHandler(e);
      });
  }
}
