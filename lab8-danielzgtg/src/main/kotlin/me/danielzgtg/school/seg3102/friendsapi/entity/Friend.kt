package me.danielzgtg.school.seg3102.friendsapi.entity

import org.apache.commons.validator.routines.EmailValidator
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

/**
 * A friends list item
 */
@Document(collection = "friend")
data class Friend(
    /**
     * The first name
     */
    var firstName: String,
    /**
     * The last name
     */
    var lastName: String,
    /**
     * The phone number
     */
    var phone: String,
    /**
     * The email address
     */
    var email: String,
) {
    /**
     * The id.
     *
     * Only null to autogenerate.
     */
    @Id
    var friendId: String? = null

    // No @Transient list because there are no other entities in this domain therefore no associations

    fun validate() {
        check(friendId?.isNotBlank() ?: true)
        // Repeat the Angular validation on the server side because client-only validation is bad
        // Some people still have just one non-Latinized name
        // Allow spaces and special characters. Think about Spanish or Slavic people
        check(firstName.isNotEmpty())
        check(lastName.isNotEmpty())
        phone.apply {
            if (isNotEmpty()) {
                check(length == 10)
                check(all { it in '0'..'9' })
                check(this[0] != '0')
                check(this[3] != '0')
            }
        }
        check(EmailValidator.getInstance().isValid(email))
    }
}
