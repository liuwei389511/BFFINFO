/** @format */

declare module "koa-swig" {
  interface KoaSwigOptions {
    root?: string;
    viewExt?: string;
    cache?: "memory" | boolean;
    writeBody?: boolean;
    autoescape?: boolean;
    locals?: { [key: string]: any };
    basedir?: string;
    ext?: string;
    cmtControls?: [string, string];
  }
  interface RenderedSwig {
    setLocals(args: { [key: string]: any }): void;

    getLocals(key: string): any;
  }

  interface SwigRenderer {
    (view: string, options?: { [key: string]: any }): Promise<string>;
  }
  interface KoaSwigRenderer {
    (settings?: KoaSwigOptions): (
      ctx: string
    ) => Generator<Promise<string>, void, unknown>;
  }
  const renderer: KoaSwigRenderer & { swig: RenderedSwig };
  export = renderer;
}
