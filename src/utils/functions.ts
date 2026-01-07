interface BuildPathParameter {
  baseUrl: string;
  pathValues: Record<string, string | number>;
}

export function buildPath({ baseUrl, pathValues }: BuildPathParameter): string {
  return baseUrl.replace(
    /:([\w]+)/g,
    (_, key) => String(pathValues[key]) || `:${key}`
  );
}
