package me.danielzgtg.school.seg3102.friendsapi.resolvers

import graphql.kickstart.tools.GraphQLQueryResolver
import me.danielzgtg.school.seg3102.friendsapi.entity.Friend
import me.danielzgtg.school.seg3102.friendsapi.repository.FriendRepository
import org.springframework.data.mongodb.core.MongoOperations
import org.springframework.stereotype.Component

@Component
class FriendQueryResolver(private val friendRepository: FriendRepository) : GraphQLQueryResolver {
    fun friends(): List<Friend> = friendRepository.findAll()
    fun friendsById(id: String): Friend? = friendRepository.findById(id).orElse(null)
    // No other unique attribute so no Query()
}
