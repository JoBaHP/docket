/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, async } from "@angular/core/testing";

import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { StatusBarComponent } from "./status-bar.component";
import { StatusBarService } from "./status-bar.service";

describe("Component: StatusBar", () => {
  let component: StatusBarComponent;
  let fixture: ComponentFixture<StatusBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatusBarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
