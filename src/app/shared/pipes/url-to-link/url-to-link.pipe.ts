import { Pipe, PipeTransform } from "@angular/core";

import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: "urlToLink"
})
export class UrlToLinkPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}

  transform(value) {
    const cleanString = value.replace(/<\/?[^>]+(>|$)/g, "");
    const exp = /\[(.*?)\]\((\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])\)/gi;
    const stringWithUrls = cleanString.replace(
      exp,
      "<a href='$2' target='_blank'>$1</a>"
    );
    return this.sanitized.bypassSecurityTrustHtml(stringWithUrls);
  }
}
