/** @format */

import { addAliases } from "module-alias";
addAliases({
  "@root": `${__dirname}`,
  "@config": `${__dirname}/config`,
  "@interfaces": `${__dirname}/interfaces`,
  "@middlewares": `${__dirname}/middlewares`,
  "@services": `${__dirname}/services`,
  "@routers": `${__dirname}/routers`,
});
import Koa from "koa";
import { createContainer, Lifetime } from "awilix";
import co from "co";
import render from "koa-swig";
import config from "@config/index";
import { loadControllers, scopePerRequest } from "awilix-koa";

const app = new Koa();
const container = createContainer({});
const { viewDir, staticDir, port, memoryFlag } = config;

//所有的可以被注入的代码都在container中
container.loadModules([`${__dirname}/services/*.ts`], {
  formatName: "camelCase",
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  },
});
//每次请求router时都会从容器中取到注入到服务中
app.use(scopePerRequest(container));
app.context.render = co.wrap(
  render({
    root: viewDir,
    autoescape: true,
    cache: <"memory" | false>memoryFlag,
    writeBody: false,
    ext: "html",
  })
);

//让所有的路由生效
app.use(loadControllers(`${__dirname}/routers/*.ts`));
app.listen(port, () => {
  console.log(`🚀 启动成功  http://localhost:${port}`);
});
