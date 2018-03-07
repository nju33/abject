import dotProp from 'dot-prop';

declare namespace abject {
  export type Fn<T extends object, R extends {[k: string]: any}> = (
    obj: T,
    aliasObj: {[k in keyof R]: string}
  ) => <K extends keyof R>(key: K) => R[typeof key] | undefined
}

const abject = <T extends object, R extends object>(
  obj: T,
  aliasObj: R & {[k: string]: string}
) => {
  const library = Object.keys(aliasObj).reduce(
    (result, prop) => {
      const path = aliasObj[prop];
      const chunks = path.split(/\[\]\.?/);

      const get = (anyValue: any) => {
        if (anyValue === undefined || !Array.isArray(anyValue)) {

          return anyValue;
        }

        return value.map((item: any) => {
          return get(dotProp.get(item, chunks[i]));
        });
      }

      let i = 0;
      const value = dotProp.get(obj, chunks[i++]);

      (result as any)[prop] = () => get(value);

      return result;
    },
    {} as Record<keyof R, <K extends keyof R>() => R[K] | undefined>
  );

  return (key: keyof R) => {
    return library[key]();
  };
};

export default abject;
