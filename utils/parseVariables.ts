export function parseVariables(variables?: string): Record<string, string> {
  if (!variables) return {};
  return variables.split(",").reduce((vars, unparsed) => {
    const [key, value] = unparsed.split("=");
    vars[key] = value;
    return vars;
  }, {} as Record<string, string>);
}
