import { Injectable } from "@angular/core";

import { ScrollPositionModel } from "./scroll-data.interface";

@Injectable()
export class WindowSizeService {
  constructor() {}

  viewportWidth() {
    // in case we are in angular universal
    if (typeof window !== "undefined") {
      let e: Object = window;
      let a = "inner";

      if (!window.innerWidth) {
        a = "client";
        e = document.documentElement || document.body;
      }

      return e[a + "Width"];
    } else {
      return "100%";
    }
  }

  viewportHeight() {
    // in case we are in angular universal
    if (typeof window !== "undefined") {
      let e: Object = window;
      let a = "inner";

      if (!window.innerHeight) {
        a = "client";
        e = document.documentElement || document.body;
      }

      return e[a + "Height"];
    } else {
      return "100%";
    }
  }

  getElementScrollPosition(element: HTMLElement): number {
    return window.pageYOffset + element.getBoundingClientRect().top;
  }

  getWindowScrollPosition(): number {
    return window.pageYOffset;
  }

  getElementHeight(element: HTMLElement): number {
    return element.getBoundingClientRect().height;
  }

  getElementsPositionInPage(elements: Array<any>) {
    const topOfFirstElement = this.getElementScrollPosition(elements[0]);
    const windowScrollY = this.getWindowScrollPosition();
    const viewportHeight = this.viewportHeight();

    let result: ScrollPositionModel = {
      topId: elements.length - 1,
      topElPercentInScreen: 0,
      startsIn: 0,
      bottomId: 0,
      bottomElPercentInScreen: 0
    };

    elements.forEach((el, index) => {
      const elFromTop = this.getElementScrollPosition(elements[index]);
      const elHeight = this.getElementHeight(el);
      const isInView =
        elFromTop + elHeight > windowScrollY &&
        elFromTop < viewportHeight + windowScrollY;
      if (isInView) {
        if (result.topId > index) {
          result.topId = index;
          result.topElPercentInScreen = this.percentOfElInViewport(
            elFromTop,
            windowScrollY,
            viewportHeight,
            elHeight
          );

          result.startsIn = this.startsIn(elFromTop, windowScrollY, elHeight);
        }

        if (result.bottomId < index) {
          result.bottomId = index;
          result.bottomElPercentInScreen = this.percentOfElInViewport(
            elFromTop,
            windowScrollY,
            viewportHeight,
            elHeight
          );
        }

        /* for case the last block scrolled its top edgo out of viewport top,
         * set topElPercentInScreen to be as bottomElPercentInScreen
         **/
        if (elements.length - 1 === index && result.topId === result.bottomId) {
          result.topElPercentInScreen = result.bottomElPercentInScreen;
          result.startsIn = this.startsIn(elFromTop, windowScrollY, elHeight);
        }
      }
    });

    return result;
  }

  /**
   *
   *
   * @param {number} elFromTop
   * @param {number} windowScrollY
   * @param {number} elHeight
   * @returns {number} from 0 to 1
   * @memberof WindowSizeService
   */

  startsIn(elFromTop: number, windowScrollY: number, elHeight: number): number {
    let scrolledOutAtTop = windowScrollY - elFromTop;
    scrolledOutAtTop = scrolledOutAtTop < 0 ? 0 : scrolledOutAtTop;

    return scrolledOutAtTop / elHeight;
  }

  /**
   *
   * @param {number} elFromTop
   * @param {number} windowScrollY
   * @param {number} viewportHeight
   * @param {number} elHeight
   * @returns {number} from 0 to 1
   * @memberof WindowSizeService
  / */
  percentOfElInViewport(
    elFromTop: number,
    windowScrollY: number,
    viewportHeight: number,
    elHeight: number
  ): number {
    let missingAtTop = elFromTop - windowScrollY;
    missingAtTop = missingAtTop < 0 ? 0 : missingAtTop;

    let missingAtBottom =
      windowScrollY + viewportHeight - (elFromTop + elHeight);
    missingAtBottom = missingAtBottom < 0 ? 0 : missingAtBottom;
    const elHeightInViewport =
      viewportHeight - (missingAtTop + missingAtBottom);
    return elHeightInViewport / elHeight;
  }

  // animationTime in seconds
  scrollToElement(element: HTMLElement, duration: number) {
    const elementY = window.pageYOffset + element.getBoundingClientRect().top;
    var startingY = window.pageYOffset;
    var diff = elementY - startingY;
    var start;

    // Bootstrap our animation - it will get called right before next frame shall be rendered.
    window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp;
      // Elapsed miliseconds since start of scrolling.
      var time = timestamp - start;
      // Get percent of completion in range [0, 1].
      var percent = Math.min(time / duration, 1);

      window.scrollTo(0, startingY + diff * percent);

      // Proceed with animation as long as we wanted it to.
      if (time < duration) {
        window.requestAnimationFrame(step);
      }
    });
  }
}
