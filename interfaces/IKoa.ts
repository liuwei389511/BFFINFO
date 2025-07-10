/** @format */

import * as Koa from "koa";

//直接定义render 方法类型
type RenderFunction = (
  view: string,
  options?: { [key: string]: any }
) => Promise<string>;
export interface Context extends Koa.Context {
  render: RenderFunction;
}
