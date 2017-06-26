export class UtilityService {
  public static initToISOString() {
    if (!Date.prototype.toISOString) {
      ( function () {

        function pad(number) {
          var r = String(number);
          if (r.length === 1) {
            r = '0' + r;
          }
          return r;
        }

        Date.prototype.toISOString = function () {
          return this.getUTCFullYear()
            + '-' + pad(this.getUTCMonth() + 1)
            + '-' + pad(this.getUTCDate())
            + 'T' + pad(this.getUTCHours())
            + ':' + pad(this.getUTCMinutes())
            + ':' + pad(this.getUTCSeconds())
            + '.' + String((this.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5)
            + 'Z';
        };

      }() );
    }
  }

  public static guid():string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}
