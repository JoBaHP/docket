import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "textarea[autosize]"
})
export class Autosize {
  private firstRun = true;

  @HostListener("input", ["$event.target"])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }
  constructor(public element: ElementRef) {}
  ngAfterContentChecked(): void {
    if (this.firstRun) {
      this.firstRun = false;
      setTimeout(() => {
        this.adjust();
      }, 0);
    }
  }
  adjust(): void {
    this.element.nativeElement.style.overflow = "hidden";
    this.element.nativeElement.style.height = "auto";
    this.element.nativeElement.style.height =
      this.element.nativeElement.scrollHeight + "px";
  }
}
