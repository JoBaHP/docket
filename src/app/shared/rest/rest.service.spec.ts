import { Actions, Effect, toPayload } from "@ngrx/effects";
/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from "@angular/core/testing";

import { RestService } from "./rest.service";
import { reducers } from "../../app.reducer";

describe("Service: Rest", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [RestService, Actions]
    });
  });

  it("should setup service", inject([RestService], (service: RestService) => {
    expect(service).toBeTruthy();
  }));
});
