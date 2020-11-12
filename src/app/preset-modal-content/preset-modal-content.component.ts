import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { ChecklistBlock } from "../checklist-service/checklist.interface";
import { ChecklistModel } from "../checklist-service/checklist.interface";
import { defaultChecklist } from "../checklist-service/default-checklist";

@Component({
  selector: "app-preset-modal-content",
  templateUrl: "./preset-modal-content.component.html",
  styleUrls: ["./preset-modal-content.component.scss"]
})
export class PresetModalContentComponent implements OnInit {
  public openedValue = false;
  public checklistPresets: ChecklistModel = defaultChecklist;

  @Input()
  get opened() {
    return this.openedValue;
  }

  @Output() openedChange = new EventEmitter<boolean>();
  @Output() onSubmit = new EventEmitter<ChecklistBlock[]>();

  constructor() {}

  set opened(value) {
    this.openedValue = value;
    this.openedChange.emit(this.openedValue);

    // once modal is opened uncheck all defaults
    if (value) {
      this.checklistPresets.data.forEach(group => {
        group.selected = false;
      });
    }
  }

  submitModalWindow(event) {
    event.stopPropagation();
    this.opened = false;
    const selectedPresets: ChecklistBlock[] = this.checklistPresets.data.filter(
      group => {
        return group.selected;
      }
    );
    const groupClone = JSON.parse(JSON.stringify(selectedPresets));
    this.onSubmit.emit(groupClone); // get rid of reference to the template
  }

  closeModalWindow(event) {
    event.stopPropagation();
    this.opened = false;
  }

  ngOnInit() {}
}
