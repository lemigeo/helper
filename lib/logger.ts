import fs from "fs";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

export class Logger {
    public static FileName: string = "basic";
    public static LogDirectory: string = "logs";
    public static Level: string = "debug";

    public static getInstance() {
        if (!this.instance) {
            if (!fs.existsSync(this.LogDirectory)) {
                fs.mkdirSync(this.LogDirectory);
            }
            this.instance = createLogger({
                level: this.Level,
                format: format.combine(
                    format.timestamp({
                        format: "YYYY-MM-DD HH:mm:ss"
                    }),
                    // format.label({ label: path.basename(process.mainModule.filename) }),
                    format.printf((info) => `${info.timestamp} [${info.level}] ${info.message}`)
                ),
                transports: [
                    new transports.Console({
                        level: "info",
                        format: format.combine(
                            format.colorize(),
                            format.printf((info) => `${info.timestamp} [${info.level}] ${info.message}`)
                        )
                    }), new DailyRotateFile({
                        filename: `${this.LogDirectory}/%DATE%-${this.FileName}.log`,
                        datePattern: "YYYY-MM-DD"
                    })
                ]
            });
        }
        return this.instance;
    }

    private static instance: any;
}
