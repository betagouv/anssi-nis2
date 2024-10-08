import * as http from "http";

export function extraisIp(headersExpress: http.IncomingHttpHeaders) {
  const ips = (headersExpress["x-forwarded-for"] as string)?.split(", ");

  if (!ips) return {};

  return { client: ips[0], waf: ips[ips.length - 1] };
}
