/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from "@angular/core/testing";

import { HelperService } from "../helpers/helper.service";
import { WindowSizeService } from "./window-size.service";
import { helperServiceStub } from "../../../../testing/testing.stubs";

describe("Service: WindowSizeService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WindowSizeService,
        { provide: HelperService, useValue: helperServiceStub }
      ]
    });
  });

  it("should ...", inject([WindowSizeService], (service: WindowSizeService) => {
    expect(service).toBeTruthy();
  }));
});
