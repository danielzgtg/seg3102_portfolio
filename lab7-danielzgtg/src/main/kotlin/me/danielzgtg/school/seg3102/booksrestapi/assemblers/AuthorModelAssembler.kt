package me.danielzgtg.school.seg3102.booksrestapi.assemblers

import me.danielzgtg.school.seg3102.booksrestapi.controller.ApiController
import me.danielzgtg.school.seg3102.booksrestapi.entities.Author
import me.danielzgtg.school.seg3102.booksrestapi.entities.Book
import me.danielzgtg.school.seg3102.booksrestapi.representation.AuthorRepresentation
import me.danielzgtg.school.seg3102.booksrestapi.representation.BookTitleRepresentation
import org.springframework.hateoas.CollectionModel
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport
import org.springframework.stereotype.Component

@Component
class AuthorModelAssembler : RepresentationModelAssemblerSupport<Author, AuthorRepresentation>(
        ApiController::class.java, AuthorRepresentation::class.java) {
    override fun toModel(entity: Author): AuthorRepresentation = instantiateModel(entity).apply {
        addLinkToMethodOnWithSelfRel { it.getAuthorById(entity.id) }
        books = toBooksRepresentation(entity.books)
        addLinkToMethodOnWithRel("bio") { it.getAuthorBioById(entity.id) }
        id = entity.id
        firstName = entity.firstName
        lastName = entity.lastName
    }

    fun toBooksRepresentation(books: List<Book>): List<BookTitleRepresentation> = books.emptyOrMap { book ->
        BookTitleRepresentation().apply {
            title = book.title
            addLinkToMethodOnWithSelfRel { it.getBookById(book.id) }
        }
    }

    override fun toCollectionModel(entities: Iterable<Author>
    ): CollectionModel<AuthorRepresentation> = super.toCollectionModel(entities).apply {
        addLinkToMethodOnWithSelfRel { it.allAuthors() }
    }
}
