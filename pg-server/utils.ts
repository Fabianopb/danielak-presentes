export const serializePayload = <T extends Record<string, unknown>>(payload: T) =>
  Object.entries(payload).reduce(
    (acc, [key, value]) =>
      typeof value === 'object' && value !== null
        ? { ...acc, [key]: JSON.stringify(value) }
        : { ...acc, [key]: value },
    {},
  );
