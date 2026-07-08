const KEY_TOKEN = "cwa_ssr_token";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function isAuthenticated() {
  return Boolean(getToken());
}

export function getToken() {
  if (!canUseStorage())
    return null;

  return window.localStorage.getItem(KEY_TOKEN) || window.sessionStorage.getItem(KEY_TOKEN);
}

export function setToken(token: string, remember = false) {
  if (!canUseStorage())
    return;

  window.sessionStorage.setItem(KEY_TOKEN, token);

  if (remember) {
    window.localStorage.setItem(KEY_TOKEN, token);
  }
}

export function clearToken() {
  if (!canUseStorage())
    return;

  window.localStorage.removeItem(KEY_TOKEN);
  window.sessionStorage.removeItem(KEY_TOKEN);
}
