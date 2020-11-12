import { Component, Input } from "@angular/core";

@Component({
  moduleId: module.id,
  selector: "app-modal-window",
  templateUrl: "./modal-window.component.html",
  styleUrls: ["./modal-window.component.scss"]
})
export class ModalWindowComponent {
  @Input() modalWindowActive;
  @Input() modalWindowTitle;

  preventClick(event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
