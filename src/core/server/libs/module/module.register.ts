import { EntitiesRegister } from '../database/entities.register';

class ModuleClass {
  constructor(private target: any, private controller: any, private entities: any[]) {
    EntitiesRegister.Entities = this.entities;
  }

  load() {
    Object.assign(new this.target(), new this.controller());
  }
}

class ModuleProvider {
  constructor(private modules: ModuleClass[] = []) {}

  get Modules() {
    return this.modules;
  }

  addModule<T extends new (...args: any[]) => unknown>(target: T, options: { entities: any[]; controller: any }) {
    this.modules.push(
      new (class extends ModuleClass {
        constructor() {
          super(target, options.controller, options.entities);
        }
      })()
    );
  }
}

const globalRef = global as any;
export const ModuleRegister: ModuleProvider =
  globalRef.ModuleRegister || (globalRef.ModuleRegister = new ModuleProvider());
