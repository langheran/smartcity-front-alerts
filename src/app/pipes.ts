import {Pipe, PipeTransform} from "@angular/core";
@Pipe({ name: 'newline' })
export class NewlinePipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if(value)
      return value.replace(/(?:\r\n|\r|\n)/g, '<br /><br />');
  }
}

@Pipe({
  name: 'truncate'
})
export class TruncatePipe {
  transform(value: string, length: number, ellipsis: string) : string {
    let limit = typeof length !== 'undefined' ? length : 10;
    let trail = typeof ellipsis !== 'undefined' ? ellipsis : '...';

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}

