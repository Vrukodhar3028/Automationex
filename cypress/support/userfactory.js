export function generateUser() {
  const signup = `user-${crypto.randomUUID().slice(0, 8)}`; // Generate short username
  const email = `${signup}@example.com`; // Use username for email

  return {
    signup: signup,
    email: email,
    passw: "Benten@10",
    fir: "edw",
    las: "vredc",
    ad1: "10-23, HNK road",
    con: "India",
    state: "Telangana",
    city: "Hyderabad",
    zip: "500383",
    Mobile: "9038493843"
  }
}
