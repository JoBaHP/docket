/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from "@angular/core/testing";

import { StatusBarService } from "./status-bar.service";

// first overwrite the subcomponent of the tested component so the test does not go deep

describe("Service: StatusBar", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatusBarService]
    });
  });

  it("should ...", inject([StatusBarService], (service: StatusBarService) => {
    expect(service).toBeTruthy();
  }));
});
