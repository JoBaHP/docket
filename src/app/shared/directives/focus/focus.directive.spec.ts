import {
  Component,
  DebugElement,
  ElementRef,
  NgZone,
  Renderer
} from "@angular/core";
/* tslint:disable:no-unused-variable */
import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick
} from "@angular/core/testing";

import { By } from "@angular/platform-browser";
import { FocusDirective } from "./focus.directive";

// first overwrite the subcomponent of the tested component so the test does not go deep
@Component({
  template: '<input appFocus type="text" value="test" />',
  selector: "app-dummy"
})
class FocusDirectiveContainerComponent {
  constructor() {}

  addressChange(event) {
    return true;
  }
}

describe("Address Autocomplete Directive", () => {
  let component: FocusDirectiveContainerComponent;
  let fixture: ComponentFixture<FocusDirectiveContainerComponent>;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FocusDirectiveContainerComponent, FocusDirective]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusDirectiveContainerComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should focus an input", fakeAsync(() => {
    let element = fixture.debugElement.query(By.css("input")).nativeElement;
    spyOn(element, "focus");
    tick(); // ngAfterViewInit
    fixture.detectChanges();
    tick(); // timeout
    fixture.detectChanges();
    expect(element.focus).toHaveBeenCalled();
  }));
});
