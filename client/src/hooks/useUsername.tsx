const USERNAME_KEY = "username";

export default function useUsername() {
  /**
   * Retrieves the username from local storage, session storage,
   *  or undefined if none above are exists.
   *
   * @returns the username that player has set, otherwise undefined;
   */
  function getStoredUsername() {
    const localStorageUsername = localStorage.getItem(USERNAME_KEY);
    // If the local storage user name has not empty
    if (localStorageUsername !== null) {
      return localStorageUsername;
    }

    const sessionStorageUsername = sessionStorage.getItem(USERNAME_KEY);
    if (sessionStorageUsername !== null) {
      return sessionStorageUsername;
    }

    return undefined;
  }

  function setTemporaryUsername(name: string) {
    if (localStorage.getItem(USERNAME_KEY) !== null) {
      console.warn(
        `The temporary name will not be use due to localStorage user name has set.`
      );
    }

    sessionStorage.setItem(USERNAME_KEY, name);
  }

  function setUsername(name: string) {
    localStorage.setItem(USERNAME_KEY, name);
  }

  return {
    getStoredUsername,
    setTemporaryUsername,
    setUsername,
  };
}
