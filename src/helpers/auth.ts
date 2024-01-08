export const signOut = (next: () => void) => {
    localStorage.removeItem("token_lucy");
    next();
};
  