export class SingletonClass {
  private static instances: Record<string, any> = {};
  private constructor() {
    console.log('SingletonClass instance created');
  }
  public static getInstance<T>(T: new () => T): T {
    const key = T.toString();
    console.log(T.name);
    
    
    if (!SingletonClass.instances[key]) {
      SingletonClass.instances[key] = new T();
    }
    return SingletonClass.instances[key];
  }
}
