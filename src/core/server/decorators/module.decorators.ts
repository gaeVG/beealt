import { MixedList, EntitySchema } from "typeorm";


export function Module(options: { entities: any[] }) {
    return function (target: any) {
        console.log(options.entities);
    }
}