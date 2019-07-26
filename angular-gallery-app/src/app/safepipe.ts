import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

//custom pipe to stop errors when sending HTTP requests to API on same server
@Pipe({
    name: 'safe'
  })
  export class SafePipe implements PipeTransform {
  
    constructor(private sanitizer: DomSanitizer) { }
    transform(url) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  
  }