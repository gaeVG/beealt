import { ModuleRegister } from "./module.register";

export class ModuleFactory  {
  private static $self: ModuleFactory;

  private constructor(private modules = ModuleRegister.Modules) {}

  public static create() {
    if (!ModuleFactory.$self) {
      ModuleFactory.$self = new ModuleFactory();
    }
    return ModuleFactory.$self;
  }

  public static loadModules() {
    const factory = ModuleFactory.create();
    factory.modules.forEach((module) => module.load());
  }
}
