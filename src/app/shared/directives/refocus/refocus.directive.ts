import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer
} from "@angular/core";

@Directive({
  selector: "[appRefocus]"
})
export class RefocusDirective implements AfterViewInit {
  private _autofocus;

  constructor(private el: ElementRef, private rd: Renderer) {}

  ngAfterViewInit() {
    const thisEl = this.el.nativeElement;
    const selectedInput = this._autofocus.selectedInput;

    if (
      selectedInput &&
      selectedInput.inputOrder === this._autofocus.newOrder
    ) {
      if (
        // the value was not edited by other user
        !selectedInput.editedByExternal &&
        // but it was edited by myself
        selectedInput.inputInitialValue !== selectedInput.inputValue
      ) {
        // in case it was only you who edited the data
        // use my value as the one in the input
        setTimeout(() => {
          ////////////////////////////thisEl.value = selectedInput.inputValue;

          thisEl.focus(); //For SSR (server side rendering) this is not safe. Use: https://github.com/angular/angular/issues/15008#issuecomment-285141070)
          //lastSelectedInput.value = this.selectedInput.inputValue;
          thisEl.setSelectionRange(
            selectedInput.inputPosition,
            selectedInput.inputPosition
          );
        }, 0);
      }
    }
  }

  @Input()
  set appRefocus(data: any) {
    this._autofocus = data;
  }
}
