import * as fromRoot from "../../app.reducer";

import { ErrorHandlingService } from "../error-handling/error-handling.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RestService } from "../rest/rest.service";
import { StatusBarService } from "../../status-bar/status-bar.service";
import { Store } from "@ngrx/store";
import { map, catchError } from "rxjs/operators";
import { UserModel } from "./user.interface";
import { environment } from "../../../environments/environment";

@Injectable()
export class UserService {
  private jsonHeaders: HttpHeaders;
  constructor(
    private _http: HttpClient,
    private _store: Store<fromRoot.State>,
    private _statusBarService: StatusBarService,
    private _restService: RestService,
    private _errorHandlingService: ErrorHandlingService
  ) {
    this.jsonHeaders = this._restService.getJsonHeaders();
  }

  postUser(user: UserModel) {
    return this._http
      .post(`${environment.sailsApi}/signup`, user, {
        headers: this.jsonHeaders
      })
      .pipe(
        map(res => {
          try {
            // ensure that there cannot be any brackets '<' '>' in the json
            return res;
          } catch (err) {
            this._statusBarService.setStatus(err, "error");
          }
        }),
        catchError(e => {
          return this._errorHandlingService.errorHandler(e);
        })
      );
  }

  updateUser(userId: string, checklistId: string) {
    const authHeaders = { headers: this._restService.getAuthHeaders() };

    return this._http
      .put(
        `${environment.sailsApi}/user/${userId}/addchecklist`,
        { checklistId },
        authHeaders
      )
      .pipe(
        map(res => {
          try {
            // ensure that there cannot be any brackets '<' '>' in the json
            return res;
          } catch (err) {
            this._statusBarService.setStatus(err, "error");
          }
        }),
        catchError(e => {
          return this._errorHandlingService.errorHandler(e);
        })
      );
  }

  getUsersChecklists(userId: string) {
    const authHeaders = { headers: this._restService.getAuthHeaders() };

    return this._http
      .get(`${environment.sailsApi}/user/${userId}/checklist`, authHeaders)
      .pipe(
        map(res => {
          try {
            // ensure that there cannot be any brackets '<' '>' in the json
            return res;
          } catch (err) {
            this._statusBarService.setStatus(err, "error");
          }
        }),
        catchError(e => {
          return this._errorHandlingService.errorHandler(e);
        })
      );
  }

  loginUser(user: UserModel) {
    return this._http
      .post(`${environment.sailsApi}/login`, user, {
        headers: this.jsonHeaders
      })
      .pipe(
        map(res => {
          try {
            // ensure that there cannot be any brackets '<' '>' in the json
            const cleanedResult = JSON.stringify(res).replace(
              /<\/?[^>]+(>|$)/g,
              ""
            );
            return JSON.parse(cleanedResult) || {};
          } catch (err) {
            this._statusBarService.setStatus(err, "error");
          }
        }),
        catchError(e => {
          return this._errorHandlingService.errorHandler(e);
        })
      );
  }
}
