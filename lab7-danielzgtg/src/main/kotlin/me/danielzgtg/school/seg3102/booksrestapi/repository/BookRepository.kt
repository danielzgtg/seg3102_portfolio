package me.danielzgtg.school.seg3102.booksrestapi.repository

import me.danielzgtg.school.seg3102.booksrestapi.entities.Book
import org.springframework.data.repository.CrudRepository

interface BookRepository: CrudRepository<Book, Long>
