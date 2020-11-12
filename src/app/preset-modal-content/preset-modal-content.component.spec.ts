import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PresetModalContentComponent } from "./preset-modal-content.component";

describe("PresetModalContentComponent", () => {
  let component: PresetModalContentComponent;
  let fixture: ComponentFixture<PresetModalContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PresetModalContentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresetModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
