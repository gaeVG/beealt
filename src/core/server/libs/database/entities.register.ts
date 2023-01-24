import { EntitySchema, MixedList } from 'typeorm';

class EntitiesProvider {
    constructor(private entities: MixedList<EntitySchema> = []) {}

    get Entities() {
        return this.entities;
    }

    set Entities(entities: MixedList<EntitySchema>) {
        this.entities = entities;
    }
}

const globalRef = global as any;
export const EntitiesRegister: EntitiesProvider =
  globalRef.EntitiesRegister || (globalRef.EntitiesRegister = new EntitiesProvider());
