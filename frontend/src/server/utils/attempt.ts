export const attempt = async <T=unknown>(fn: () => Promise<T>, tries = 3): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (tries === 0) {
      throw error;
    }
    return await attempt(fn, tries - 1);
  }
};