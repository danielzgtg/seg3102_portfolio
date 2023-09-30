package me.danielzgtg.school.seg3102.friendsapi.repository

import me.danielzgtg.school.seg3102.friendsapi.entity.Friend
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface FriendRepository: MongoRepository<Friend, String>
