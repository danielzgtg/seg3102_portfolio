/**
 * The actual friend data
 */
export interface NewProfile {
  /**
   * The first name
   */
  first: string;
  /**
   * The last name
   */
  last: string;
  /**
   * The phone number
   */
  phone: string;
}

/**
 * A friends list item
 */
export interface Profile extends NewProfile {
  /**
   * The id
   */
  uid: string;
  /**
   * The email address
   */
  email: string;
}

export function toProfile(uid: string, x: Profile | any): Profile {
  if (!x) {
    uid = "";
    x = {};
  }
  return {
    uid,
    first: "" + (x.first || ""),
    last: "" + (x.last || ""),
    phone: "" + (x.phone || ""),
    email: "" + (x.email || ""),
  }
}

export function toNewProfile(x: any | NewProfile): NewProfile {
  const { first, last, phone } = toProfile("", x);
  return { first, last, phone };
}
