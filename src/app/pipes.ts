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
  transform(value: string, args: string[]) : string {
    let limit = args.length > 0 ? parseInt(args[0], 10) : 10;
    let trail = args.length > 1 ? args[1] : '...';

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}

