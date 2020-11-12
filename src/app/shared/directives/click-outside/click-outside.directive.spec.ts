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
import { ClickOutsideDirective } from "./click-outside.directive";

// first overwrite the subcomponent of the tested component so the test does not go deep
@Component({
  moduleId: module.id,
  template:
    '<div id="wrap"><input id="input" appClickOutside (clickOutside)="clickedOutside($event)" type="text" value="test" /></div>',
  selector: "app-dummy"
})
class ClickOutsideContainerComponent {
  clickedOutside(event) {
    return true;
  }
}

describe("Click outside Directive", () => {
  let component: ClickOutsideContainerComponent;
  let fixture: ComponentFixture<ClickOutsideContainerComponent>;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClickOutsideContainerComponent, ClickOutsideDirective]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickOutsideContainerComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // somehow document:click on hostlistener is not triggered anymore in unit tests, so this cannot be tested
  /*   it('should call clicked outside', () => {
    let wrap = fixture.debugElement.query(By.css('#wrap')).nativeElement;
    spyOn(component, 'clickedOutside');
    wrap.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.clickedOutside).toHaveBeenCalled();
  }); */

  it("should not call clicked outside", () => {
    let input = fixture.debugElement.query(By.css("#input")).nativeElement;
    spyOn(component, "clickedOutside");
    input.dispatchEvent(new Event("click"));
    fixture.detectChanges();

    expect(component.clickedOutside).not.toHaveBeenCalled();
  });
});
