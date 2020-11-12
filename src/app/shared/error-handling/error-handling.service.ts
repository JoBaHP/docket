
import {throwError as observableThrowError,  Observable } from 'rxjs';
import * as fromRoot from "../../app.reducer";
import * as userActions from "../user/user.actions";

import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { Router } from "@angular/router";
import { StatusBarService } from "../../status-bar/status-bar.service";
import { Store } from "@ngrx/store";

@Injectable()
export class ErrorHandlingService {
  constructor(
    private _statusBarService: StatusBarService,
    private _router: Router,
    private _store: Store<fromRoot.State>
  ) {}

  errorHandler(error: Response | any): any {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || "";
      const err = body.error || JSON.stringify(body);
      if (body.message) {
        errMsg = `${body.message}`;
      } else {
        // if the token is not valid anymore go to login
        if (error.status === 401) {
          errMsg = `Your login has expired... Please, log in again.`;
          this._store.dispatch(new userActions.SetUser(null));
          this._router.navigate(["login"]);
        } else {
          errMsg = `${error.status} - ${error.statusText || ""} ${err}`;
        }
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    this._statusBarService.setStatus(errMsg, "error");

    return observableThrowError(errMsg);
  }
}
