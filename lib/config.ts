import extend from "extend";
import path from "path";

export class Config {
    public static get(dir: string, ...names: any[]) {
        if (dir.length < 1 || dir === null) {
            throw new Error("invalid directory parameter");
        }
        if (names.length === 0) {
            throw new Error("invalid name array parameter");
        }
        return names.reduce((config, name) => {
            try {
                const newConfig = extend(true, config, require(path.join(dir, name + ".json")));
                newConfig.__envs.push(name);
                return newConfig;
            } catch (err) {
                throw err;
            }
        }, {
            __envs: []
        });
    }
}
