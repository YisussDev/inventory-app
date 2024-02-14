import { Injectable } from "@angular/core";


@Injectable()
export class CrudService {

    constructor(

    ) {
    }

    public create(objects: any[], object: any): any[] {
        objects.push(object);
        return objects;
    }

    public update(objects: any[], object: any, control_name: string = "id"): any[] {
        let indexVar = objects.findIndex(res => res[control_name] == object[control_name]);
        if (indexVar != -1) {
            objects.splice(indexVar, 1, object);
        }
        return objects;
    }

    public delete(objects: any[], object: any, control_name: string = "id"): any[] {
        let newObjects = objects.filter(res => res[control_name] != object[control_name]);
        return newObjects;
    }

}
