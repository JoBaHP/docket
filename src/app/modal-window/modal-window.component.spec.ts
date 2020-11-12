import * as fromRoot from "../app.reducer";

import { ComponentFixture, TestBed, async } from "@angular/core/testing";

import { ModalWindowComponent } from "./modal-window.component";
import { reducers } from "../app.reducer";

describe("ModalWindowComponent", () => {
  let component: ModalWindowComponent;
  let fixture: ComponentFixture<ModalWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalWindowComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
