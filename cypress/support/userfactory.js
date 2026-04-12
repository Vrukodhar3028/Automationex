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
    con: "Canada",
    state: "Telangana",
    city: "Hyderabad",
    zip: "500383",
    Mobile: "9038493843",
    comment: "Hellow",
    Cardname: "Master",
    Cardnum: "547289429345",
    CVC: "234",
    expirymonth: "12",
    expiryyear: "2029"
  }
}
