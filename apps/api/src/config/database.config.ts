import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

export const DatabaseModule = TypeOrmModule.forRootAsync({
  imports:    [ConfigModule],
  inject:     [ConfigService],
  useFactory: (cfg: ConfigService) => ({
    type:        "postgres" as const,
    host:        cfg.getOrThrow("app.db.host"),
    port:        cfg.getOrThrow<number>("app.db.port"),
    username:    cfg.getOrThrow("app.db.username"),
    password:    cfg.getOrThrow("app.db.password"),
    database:    cfg.getOrThrow("app.db.database"),
    autoLoadEntities: true,
    synchronize: cfg.get("app.nodeEnv") === "development",
    logging:     cfg.get("app.nodeEnv") === "development",
  }),
});
