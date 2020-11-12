
import {combineLatest as observableCombineLatest,  Observable } from 'rxjs';
import * as fromRoot from "../app.reducer";

import {
  ChecklistBlock,
  ChecklistModel
} from "../checklist-service/checklist.interface";
import { Component, ElementRef, OnInit } from "@angular/core";

import { ChecklistService } from "../checklist-service/checklist.service";
import { ScrollPositionModel } from "../shared/window-size/scroll-data.interface";
import { Store } from "@ngrx/store";
import { WindowSizeService } from "../shared/window-size/window-size.service";

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.scss"]
})
export class ContentComponent implements OnInit {
  private checklist$: Observable<ChecklistModel>;
  public checklistData: ChecklistBlock[];
  public scrollPointer = {
    height: 0,
    top: 0
  };

  constructor(
    private _store: Store<fromRoot.State>,
    private _el: ElementRef,
    private _checklistService: ChecklistService,
    private _windowSizeService: WindowSizeService
  ) {
    observableCombineLatest(
      this._store.select(fromRoot.getChecklist),
      this._store.select(fromRoot.getChecklistStateChangeNumber)
    ).subscribe(data => {
      if (data[0]) {
        const checklist = data[0];
        this.checklistData = checklist.data;
      } else {
        this.checklistData = null;
      }
    });
  }

  ngOnInit() {
    this._checklistService.scrollData.subscribe(
      (scrollData: ScrollPositionModel) => {
        const contentItems = [].slice.call(
          this._el.nativeElement.querySelectorAll(".content-item")
        );

        let scrollPointerHeight = 0;
        let scrollPostionTop = 0;

        contentItems.forEach((element, index) => {
          if (index < scrollData.topId) {
            scrollPostionTop += this._windowSizeService.getElementHeight(
              element
            );
          } else if (index === scrollData.topId) {
            scrollPostionTop +=
              this._windowSizeService.getElementHeight(element) *
              scrollData.startsIn;
          }

          if (index === scrollData.topId) {
            // just add part of height of a block
            scrollPointerHeight +=
              this._windowSizeService.getElementHeight(element) *
              scrollData.topElPercentInScreen;
          } else if (
            index === scrollData.bottomId &&
            scrollData.bottomId !== scrollData.topId
          ) {
            // just add part of height of a block
            scrollPointerHeight +=
              this._windowSizeService.getElementHeight(element) *
              scrollData.bottomElPercentInScreen;
          } else if (index > scrollData.topId && index < scrollData.bottomId) {
            // add whole heigt as this block is all visible
            scrollPointerHeight += this._windowSizeService.getElementHeight(
              element
            );
          }
        });

        this.scrollPointer.height = scrollPointerHeight;
        this.scrollPointer.top = scrollPostionTop;
      }
    );
  }

  scrollTo(id) {
    const element = document.getElementById(`group${id}`);
    if (element) {
      this._windowSizeService.scrollToElement(element, 300);
    }
  }

  getGropuProgress(group) {
    const progress =
      (100 / group.items.length) *
      group.items.filter(item => item.checked).length;
    return `${progress}%`;
  }
}
