import { EntitySchema, MixedList } from 'typeorm';

class EntitiesProvider {
    constructor(private entities: any[] = []) {}

    get Entities() {
        return this.entities;
    }

    set Entities(entities: any[]) {
        this.entities = [...this.entities, ...entities];
    }
}

const globalRef = global as any;
export const EntitiesRegister: EntitiesProvider =
  globalRef.EntitiesRegister || (globalRef.EntitiesRegister = new EntitiesProvider());
