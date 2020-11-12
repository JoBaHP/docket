import { Injectable } from "@angular/core";
import { StatusStackModel } from "./status-stack.interface";

@Injectable()
export class StatusBarService {
  public statusStack: StatusStackModel[] = [];
  private DEFAULT_TIMEOUT = 3000;
  private customTimeOut: number;

  constructor() {}

  removeFirstStatusInArray() {
    setTimeout(() => {
      this.statusStack.shift();
    }, this.getTimeOut());
  }

  getTimeOut() {
    return this.customTimeOut ? this.customTimeOut : this.DEFAULT_TIMEOUT;
  }

  setStatus(status, type, timeInMilisecond?: number) {
    if (timeInMilisecond) {
      this.customTimeOut = timeInMilisecond;
    }

    this.statusStack.push({ message: status, type: type });
    this.removeFirstStatusInArray();
  }

  setServerStatus(status, type, timeInMilisecond?: number) {
    if (timeInMilisecond) {
      this.customTimeOut = timeInMilisecond;
    }

    this.statusStack.push({ message: `Error: ${status}`, type: type });
    this.removeFirstStatusInArray();
  }
}
