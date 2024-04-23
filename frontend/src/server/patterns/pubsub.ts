export const createPubSub = <T extends string>() => {
  const eventMap = {} as Record<T, Set<(...args: any[]) => void>>;

  return {
    on: (event: T, callback: (...args: any[]) => void) => {
      if (!eventMap[event]) {
        // create a new set
        eventMap[event] = new Set();
      }

      eventMap[event].add(callback);
    },

    off: (event: T, callback: (...args: any[]) => void) => {
      if (!eventMap[event]) {
        return;
      }

      eventMap[event].delete(callback);
    },

    emit: (event: T, ...args: any[]) => {
      if (!eventMap[event]) {
        return;
      }

      eventMap[event].forEach((cb: any) => cb(...args));
    }
  };
};
