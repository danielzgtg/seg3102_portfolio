package me.danielzgtg.school.seg3102.booksrestapi.repository

import me.danielzgtg.school.seg3102.booksrestapi.entities.Author
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository

interface AuthorRepository: CrudRepository<Author, Long> {
    @Query(value = "SELECT aut FROM Author aut WHERE aut.firstName = :firstName and aut.lastName = :lastName")
    fun findAuthorsByName(firstName: String, lastName: String): List<Author>
}
