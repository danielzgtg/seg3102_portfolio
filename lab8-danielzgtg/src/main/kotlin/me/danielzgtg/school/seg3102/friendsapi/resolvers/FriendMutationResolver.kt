package me.danielzgtg.school.seg3102.friendsapi.resolvers

import graphql.kickstart.tools.GraphQLMutationResolver
import me.danielzgtg.school.seg3102.friendsapi.entity.Friend
import me.danielzgtg.school.seg3102.friendsapi.repository.FriendRepository
import org.springframework.data.mongodb.core.MongoOperations
import org.springframework.stereotype.Component
import java.util.UUID

@Component
class FriendMutationResolver(
    private val friendRepository: FriendRepository,
    private val mongoOperations: MongoOperations,
) : GraphQLMutationResolver {
    fun newFriend(
        firstName: String,
        lastName: String,
        phone: String,
        email: String,
        // Avoid id collisions with insert
    ): Friend = friendRepository.insert(Friend(
        firstName = firstName,
        lastName = lastName,
        phone = phone,
        email = email
    ).apply { validate() })

    fun deleteFriend(friendId: String): Boolean = true.also { friendRepository.deleteById(friendId) }

    fun updateFriend(
        friendId: String,
        firstName: String?,
        lastName: String?,
        phone: String?,
        email: String?,
    ): Friend = friendRepository.findById(friendId).get().also { friend ->
        firstName?.also { friend.firstName = it }
        lastName?.also { friend.lastName = it }
        phone?.also { friend.phone = it }
        email?.also { friend.email = it }
        friend.validate()
        // Too bad we have no transaction support. This might race with itself or deleteFriend
        friendRepository.save(friend)
    }
}
