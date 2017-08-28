import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})

export class SafeHtmlPipe implements PipeTransform {
  constructor(
    private sanitizer: DomSanitizer
  ){}

  transform(value: any, args: any[]): SafeStyle {
    if (!value) return;
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
