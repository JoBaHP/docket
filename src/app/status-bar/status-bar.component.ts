import { Component } from "@angular/core";
import { StatusBarService } from "./status-bar.service";

@Component({
  moduleId: module.id,
  selector: "app-status-bar",
  templateUrl: "./status-bar.component.html",
  styleUrls: ["./status-bar.component.scss"]
})
export class StatusBarComponent {
  constructor(public statusBarService: StatusBarService) {}

  closeBar(index) {
    this.statusBarService.statusStack.splice(index, 1);
  }
}
