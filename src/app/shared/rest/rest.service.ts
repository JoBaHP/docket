import * as fromRoot from "../../app.reducer";

import { HttpHeaders } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

@Injectable()
export class RestService {
  constructor(private _store: Store<fromRoot.State>) {}

  getAuthHeaders() {
    let headers = new HttpHeaders();

    headers = headers.set("Content-Type", "application/json; charset=utf-8");
    headers = headers.set("Accept", "application/json");

    let token = "";
    this._store.select(fromRoot.getAuthToken).subscribe(data => {
      token = data;
    });

    if (token) {
      headers = headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  }

  getJsonHeaders() {
    let headers = new HttpHeaders();

    headers = headers.set("Content-Type", "application/json; charset=utf-8");
    headers = headers.set("Accept", "application/json");

    return headers;
  }
}
