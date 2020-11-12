import * as fromRoot from "../app.reducer";
import * as userActions from "../shared/user/user.actions";

import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

type Mode = "login" | "register";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public mode: Mode = "login";
  public formData = {
    passwordConfirmation: "",
    password: "",
    email: ""
  };

  constructor(private _store: Store<fromRoot.State>, private _router: Router) {}

  ngOnInit() {}

  submitForm() {
    if (this.mode === "login") {
      const loginData = {
        password: this.formData.password,
        email: this.formData.email,
        checklists: []
      };
      this._store.dispatch(new userActions.LoginUser(loginData));
    } else if (this.mode === "register") {
      const registerData = {
        ...this.formData,
        checklists: []
      };
      this._store.dispatch(new userActions.CreateUser(registerData));
    }

    this._store
      .select(fromRoot.getUser)
      .filter(data => !!data)
      .first()
      .subscribe(user => {
        this._router.navigate(["/"]);
      });
  }
}
