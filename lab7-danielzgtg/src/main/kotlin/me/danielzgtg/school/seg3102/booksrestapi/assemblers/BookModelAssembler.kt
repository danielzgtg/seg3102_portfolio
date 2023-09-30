package me.danielzgtg.school.seg3102.booksrestapi.assemblers

import me.danielzgtg.school.seg3102.booksrestapi.controller.ApiController
import me.danielzgtg.school.seg3102.booksrestapi.entities.Author
import me.danielzgtg.school.seg3102.booksrestapi.entities.Book
import me.danielzgtg.school.seg3102.booksrestapi.representation.AuthorNameRepresentation
import me.danielzgtg.school.seg3102.booksrestapi.representation.BookRepresentation
import me.danielzgtg.school.seg3102.booksrestapi.representation.BookTitleRepresentation
import org.springframework.hateoas.CollectionModel
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport
import org.springframework.stereotype.Component

@Component
class BookModelAssembler : RepresentationModelAssemblerSupport<Book, BookRepresentation>(
        ApiController::class.java, BookRepresentation::class.java) {
    override fun toModel(entity: Book): BookRepresentation = instantiateModel(entity).apply {
        addLinkToMethodOnWithSelfRel { it.getBookById(entity.id) }
        authors = toAuthorsRepresentation(entity.authors)
        addLinkToMethodOnWithRel("orders") { it.getBookOrdersById(entity.id) }
        id = entity.id
        isbn = entity.isbn
        category = entity.category
        title = entity.title
        cost = entity.cost
        year = entity.year
        description = entity.description
    }

    fun toAuthorsRepresentation(authors: List<Author>): List<AuthorNameRepresentation> = authors.emptyOrMap { author ->
        AuthorNameRepresentation().apply {
            firstName = author.firstName
            lastName = author.lastName
            addLinkToMethodOnWithSelfRel { it.getAuthorById(author.id) }
        }
    }

    override fun toCollectionModel(entities: Iterable<Book>
    ): CollectionModel<BookRepresentation> = super.toCollectionModel(entities).apply {
        addLinkToMethodOnWithSelfRel { it.allBooks() }
    }
}
