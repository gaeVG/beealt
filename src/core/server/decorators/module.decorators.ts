import { ModuleRegister } from "../libs/module/module.register";

export function Module(options: { entities: any[], controller: any }) {
    return function<T extends new (...args: any[]) => {}>(target: T) {
        ModuleRegister.addModule(target, options);
    }
}
