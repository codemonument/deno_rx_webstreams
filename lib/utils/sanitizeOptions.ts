export function sanitizeOptions<T>(options: T | undefined, defaults: T) {
  if (!options) {
    options = defaults;
  } else {
    options = { ...defaults, ...options };
  }

  return options;
}
