# Documentation: Token Expiration Date in JWT Authentication

This document explains the concept of generating `tokenExpirationDate`, storing it in local storage, and its nuances in the context of a React application that uses JWT authentication.

## Overview

In a JWT-based authentication system, managing the token's lifespan is crucial for security and user experience. The `tokenExpirationDate` is a timestamp indicating when the token will expire. Storing this expiration date in local storage allows the application to automatically log out the user once the token expires, maintaining security and ensuring a seamless user experience.

## Key Concepts

### Token Expiration Date

The `tokenExpirationDate` is a timestamp generated when the user logs in. It typically represents a point in time when the token becomes invalid. In this application, we set the token to expire one hour (3600 seconds) after it's issued.

### Local Storage

Local storage is a web storage mechanism that allows us to store data persistently across sessions. By storing the token and its expiration date in local storage, we can maintain the user's authenticated state even after a page reload or browser restart.

## Implementation Details

### Generating and Storing the Token Expiration Date

When the user logs in, we generate the token expiration date and store it, along with the token and user ID, in local storage.

**Code Snippet:**

```javascript
const login = useCallback((uid, token, expirationDate) => {
  setToken(token);
  setUserId(uid);
  const tokenExpirationDate =
    expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // Set expiration date to 1 hour from now
  localStorage.setItem(
    "userData",
    JSON.stringify({
      userId: uid,
      token,
      expiration: tokenExpirationDate.toISOString(),
    })
  );
}, []);
```

#### Explanation:

- `setToken(token)` and `setUserId(uid)` update the state with the user's token and ID.
- `expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)` sets the expiration date to the provided date or defaults to one hour from the current time.
- `localStorage.setItem("userData", JSON.stringify({ ... }))` stores the user data, including the token and expiration date, in local storage.

### Using the Stored Token on Page Load

When the application loads, we check if there is stored user data in local storage. If valid, we log the user in automatically.

**Code Snippet:**

```javascript
useEffect(() => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  if (
    storedData &&
    storedData.token &&
    new Date(storedData.expiration) > new Date()
  ) {
    login(storedData.userId, storedData.token, new Date(storedData.expiration));
  }
}, [login]);
```

#### Explanation:

- `JSON.parse(localStorage.getItem("userData"))` retrieves and parses the stored user data from local storage.
- `if (storedData && storedData.token && new Date(storedData.expiration) > new Date())` checks if the stored token is still valid by comparing the current date with the expiration date.
- `login(storedData.userId, storedData.token, new Date(storedData.expiration))` logs the user in with the stored data.

### Logging Out the User

The user can log out, which clears the token and user data from the state and local storage.

**Code Snippet:**

```javascript
const logout = useCallback(() => {
  setToken(null);
  setUserId(null);
  localStorage.removeItem("userData");
}, []);
```

#### Explanation:

- `setToken(null)` and `setUserId(null)` clear the authentication state.
- `localStorage.removeItem("userData")` removes the user data from local storage.

## Benefits of Storing Token Expiration Date

1. **Security**: Automatically logging out users when the token expires prevents unauthorized access.
2. **User Experience**: Maintains the user's authenticated state across sessions without requiring frequent re-login.
3. **Consistency**: Ensures that token expiration is consistently managed on both the client and server sides.

## Conclusion

By generating a `tokenExpirationDate` and storing it in local storage, we can effectively manage user sessions in a JWT-based authentication system. This approach enhances security, improves user experience, and ensures consistent handling of token expiration.
