import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClearObjectsService {
  constructor() {
  }

  clear(obj: any): any {
    if (typeof obj === 'object') {
      const keys: string[] = Object.keys(obj);
      for (const prop of keys) {
        if ((obj[prop] != null) && typeof obj[prop] === 'object') {
          if (Array.isArray(obj[prop])) {
            for (let i = 0; i < obj[prop].length; i++) {
              if (typeof obj[prop][i] === 'object') {
                this.clear(obj[prop][i]);
                if (Object.keys(obj[prop][i]).length === 0) {
                  obj[prop].splice(i, 1);
                  i--;
                }
              } else if (obj[prop][i] === undefined) {
                obj[prop].splice(i, 1);
                i--;
              }
            }
          } else {
            this.clear(obj[prop]);
            if (Object.keys(obj[prop]).length === 0) {
              delete obj[prop];
            }
          }
        } else if (obj[prop] === undefined) {
          delete obj[prop];
        }
      }
      return obj;
    }
  }

}
