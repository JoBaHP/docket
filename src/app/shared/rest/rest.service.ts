import * as fromRoot from "../../app.reducer";

import { Headers, RequestOptions } from "@angular/http";

import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

@Injectable()
export class RestService {
  constructor(private _store: Store<fromRoot.State>) {}

  getAuthHeaders() {
    const headerData: any = {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json"
    };
    let token = "";
    this._store.select(fromRoot.getAuthToken).subscribe(data => {
      token = data;
    });

    if (token) {
      headerData["authorization"] = `Bearer ${token}`;
    }
    const headers = new Headers(headerData);

    return new RequestOptions({ headers: headers });
  }

  getJsonHeaders() {
    const headerData: any = {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json"
    };

    const headers = new Headers(headerData);

    return new RequestOptions({ headers: headers });
  }
}
