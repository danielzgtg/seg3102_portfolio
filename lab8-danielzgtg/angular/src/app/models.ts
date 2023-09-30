/**
 * The actual friend data
 */
export interface NewFriend {
  /**
   * The first name
   */
  firstName: string;
  /**
   * The last name
   */
  lastName: string;
  /**
   * The phone number
   */
  phone: string;
  /**
   * The email address
   */
  email: string;
}

/**
 * A friends list item
 */
export interface Friend extends NewFriend {
  /**
   * The id
   */
  friendId: string;
}

export function toFriend(x: any | Friend): Friend {
  return {
    friendId: "" + x.friendId,
    firstName: "" + x.firstName,
    lastName: "" + x.lastName,
    phone: "" + x.phone,
    email: "" + x.email,
  }
}

export function toNewFriend(x: any | NewFriend): NewFriend {
  const { firstName, lastName, phone, email } = toFriend(x);
  return { firstName, lastName, phone, email };
}
