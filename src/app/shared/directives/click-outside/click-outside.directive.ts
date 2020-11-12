import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output
} from "@angular/core";

// fix for angular universal
declare const global: any;
const MouseEvent = (global as any).MouseEvent as MouseEvent;
const HTMLElement = (global as any).HTMLElement as HTMLElement;

@Directive({
  selector: "[appClickOutside]"
})
export class ClickOutsideDirective {
  @Output() public clickOutside = new EventEmitter<MouseEvent>();

  constructor(private _elementRef: ElementRef) {}

  @HostListener("document:mousedown", ["$event", "$event.target"])
  private onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    const clickedInside = this._elementRef.nativeElement.contains(
      targetElement
    );

    if (!clickedInside) {
      this.clickOutside.emit(event);
    }
  }
}
