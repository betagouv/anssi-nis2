export function extraisIp(headersExpress: Express.Request) {
  const ips = headersExpress["x-forwarded-for"]?.split(", ");

  if (!ips) return {};

  return { client: ips[0], waf: ips[ips.length - 1] };
}
