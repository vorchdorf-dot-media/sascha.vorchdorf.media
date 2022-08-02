import type { HandlerEvent } from '@netlify/functions';

export class HTTPError extends Error implements Error {
  private _headers: Record<string, string>;
  private _status: number;

  constructor(
    message: string,
    status = 500,
    headers: Record<string, string> = {},
  ) {
    super(message);

    this._status = status;
    this._headers = headers;
  }

  public get headers() {
    return this._headers;
  }

  public get status() {
    return this._status;
  }

  public toString() {
    return `HTTP Status ${this.status}: ${this.message}`;
  }
}

export const checkAuth = (event: HandlerEvent) => {
  const USERNAME = process.env.HOOK_FUNCTION_USERNAME;
  const PASSWORD = process.env.HOOK_FUNCTION_PASSWORD;

  const BASIC_AUTH_REGEXP = /^\s*basic\s(?<auth>[a-z0-9._~+/-]+=*)\s*$/i;

  if (!USERNAME || !PASSWORD) {
    console.info(
      'Authentication check disabled; no HOOK_FUNCTION_ environment variables set!',
    );
    return true;
  }

  const auth = event.headers.authorization ?? '';

  const matches = BASIC_AUTH_REGEXP.exec(auth);

  if (!matches?.groups?.auth) {
    throw new HTTPError('Unauthorized', 401, {
      'WWW-Authenticate':
        'Basic realm="Trigger Github commit hook", charset="UTF-8"',
    });
  }

  const [username, password] = Buffer.from(matches.groups.auth, 'base64')
    .toString('utf-8')
    .trim()
    .split(':');

  if (username !== USERNAME || password !== PASSWORD) {
    throw new HTTPError('Forbidden', 403);
  }

  return true;
};

export const filterObject = <T>(
  obj: Record<string, any>,
  filter: string[] = [],
  isBlacklist = true,
): T => {
  const arr = Object.entries(obj);
  const set = new Set(filter);

  const filtered = arr.filter(([property]) =>
    isBlacklist ? !set.has(property) : set.has(property),
  );

  return Object.fromEntries(filtered) as T;
};
