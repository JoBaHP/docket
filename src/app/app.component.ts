import { ChecklistService } from "./checklist-service/checklist.service";
import { Component } from "@angular/core";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public isMobile = false;
  constructor(private _checklistService: ChecklistService) {
    this.isMobile = this._checklistService.isMobile();

    // remove the inital minimal css so it cannot conflict with real app
    const tempStyles = document.getElementById("temp-styles");
    if (tempStyles) {
      document.head.removeChild(tempStyles);
    }
  }
}
