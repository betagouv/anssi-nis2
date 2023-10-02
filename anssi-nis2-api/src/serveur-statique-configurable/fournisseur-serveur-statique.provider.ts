import { Provider } from "@nestjs/common";
import { ExpressBasicAuthLoader } from "./express-basic-auth.loader";
import { AbstractLoader } from "@nestjs/serve-static";
import { HttpAdapterHost } from "@nestjs/core";

export const fournisseurServeurStatique: Provider[] = [
  {
    provide: AbstractLoader,
    useFactory: () => {
      return new ExpressBasicAuthLoader();
    },
    inject: [HttpAdapterHost],
  },
];
