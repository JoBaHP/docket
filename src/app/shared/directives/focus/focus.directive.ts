import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer
} from "@angular/core";

@Directive({
  selector: "[appFocus]"
})
export class FocusDirective implements AfterViewInit {
  private _autofocus;

  constructor(private el: ElementRef, private rd: Renderer) {
    // rd.setElementStyle(el.nativeElement,'background','red');
  }

  ngAfterViewInit() {
    if (this._autofocus || typeof this._autofocus === "undefined") {
      setTimeout(() => {
        this.el.nativeElement.focus(); //For SSR (server side rendering) this is not safe. Use: https://github.com/angular/angular/issues/15008#issuecomment-285141070)
      }, 0);
    }
  }

  @Input()
  set appFocus(condition: boolean) {
    this._autofocus = condition != false;
  }
}
