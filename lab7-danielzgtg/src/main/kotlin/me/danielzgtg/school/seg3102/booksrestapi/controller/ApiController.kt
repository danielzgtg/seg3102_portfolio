package me.danielzgtg.school.seg3102.booksrestapi.controller

import io.swagger.v3.oas.annotations.Operation
import me.danielzgtg.school.seg3102.booksrestapi.assemblers.AuthorModelAssembler
import me.danielzgtg.school.seg3102.booksrestapi.assemblers.BioModelAssembler
import me.danielzgtg.school.seg3102.booksrestapi.assemblers.BookModelAssembler
import me.danielzgtg.school.seg3102.booksrestapi.assemblers.OrderModelAssembler
import me.danielzgtg.school.seg3102.booksrestapi.entities.*
import me.danielzgtg.school.seg3102.booksrestapi.repository.AuthorRepository
import me.danielzgtg.school.seg3102.booksrestapi.repository.BioRepository
import me.danielzgtg.school.seg3102.booksrestapi.repository.BookRepository
import me.danielzgtg.school.seg3102.booksrestapi.repository.OrderRepository
import me.danielzgtg.school.seg3102.booksrestapi.representation.*
import org.springframework.data.repository.CrudRepository
import org.springframework.hateoas.CollectionModel
import org.springframework.hateoas.RepresentationModel
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.support.ServletUriComponentsBuilder
import java.util.*
import kotlin.NoSuchElementException

private inline fun <T : MyIdentifiable, R> simpleGet(
        id: Long, repo: CrudRepository<T, Long>, crossinline block: (T) -> R,
): ResponseEntity<R> = repo.findById(id)
        .map { ResponseEntity.ok(block(it)) }
        .orElse(ResponseEntity.notFound().build())

private inline fun <reified T : MyIdentifiable, R : RepresentationModel<R>> simpleGet(
        id: Long, repo: CrudRepository<T, Long>, assembler: RepresentationModelAssemblerSupport<T, R>,
): ResponseEntity<R> = simpleGet(id, repo) { assembler.toModel(it) }

private fun <T : MyIdentifiable, R : RepresentationModel<R>> simpleCreate(
        repo: CrudRepository<T, Long>, assembler: RepresentationModelAssemblerSupport<T, R>, item: T,
): ResponseEntity<R> {
    try {
        return repo.save(item).let {
            ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{id}").buildAndExpand(it.id).toUri()).body(assembler.toModel(it))
        }
    } catch (_: NoSuchElementException) {
    } catch (_: IllegalAccessException) {
    }
    return ResponseEntity.badRequest().build()
}

private inline fun <T : MyIdentifiable, R : RepresentationModel<R>> wrapCreate(
        repoPath: String, repo: CrudRepository<T, Long>, assembler: RepresentationModelAssemblerSupport<T, R>,
        item: T, block: T.() -> Unit,
): ResponseEntity<R> {
    try {
        block(item)
        return repo.save(item).let {
            ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/books-api").path(repoPath).path("/{id}")
                    .buildAndExpand(it.id).toUri()).body(assembler.toModel(it))
        }
    } catch (_: NoSuchElementException) {
    } catch (_: IllegalAccessException) {
    }
    return ResponseEntity.badRequest().build()
}

private inline fun wrapIdempotent(block: () -> Unit): ResponseEntity<Unit> {
    try {
        block()
        return ResponseEntity.noContent().build()
    } catch (_: NoSuchElementException) {
    } catch (_: IllegalAccessException) {
    }
    return ResponseEntity.badRequest().build()
}


@RestController
@CrossOrigin(origins = ["http://localhost:4200"])
@RequestMapping("books-api", produces = ["application/hal+json"])
class ApiController(
        val authorRepository: AuthorRepository,
        val bioRepository: BioRepository,
        val bookRepository: BookRepository,
        val orderRepository: OrderRepository,
        val authorAssembler: AuthorModelAssembler,
        val bioAssembler: BioModelAssembler,
        val bookAssembler: BookModelAssembler,
        val orderAssembler: OrderModelAssembler,
) {
    @Operation(summary = "Get all authors")
    @GetMapping("/authors")
    fun allAuthors(): ResponseEntity<CollectionModel<AuthorRepresentation>> = ResponseEntity.ok(
            authorAssembler.toCollectionModel(authorRepository.findAll()))

    @Operation(summary = "Get all authors by firstName and lastName")
    @GetMapping("/authors", params = ["firstName", "lastName"])
    fun getAuthorsByName(@RequestParam("firstName") firstName: String,
                         @RequestParam("lastName") lastName: String):
            ResponseEntity<CollectionModel<AuthorRepresentation>> = ResponseEntity.ok(
            authorAssembler.toCollectionModel(authorRepository.findAuthorsByName(firstName, lastName)))

    @Operation(summary = "Get an authors by id")
    @GetMapping("/authors/{id}")
    fun getAuthorById(@PathVariable("id") id: Long): ResponseEntity<AuthorRepresentation> =
            simpleGet(id, authorRepository, authorAssembler)

    @Operation(summary = "Get all the books of and author")
    @GetMapping("/authors/{id}/books")
    fun getAuthorBooksById(@PathVariable("id") id: Long): ResponseEntity<List<BookTitleRepresentation>> =
            simpleGet(id, authorRepository) { authorAssembler.toBooksRepresentation(it.books) }

    @Operation(summary = "Get an author's biographical information")
    @GetMapping("/authors/{id}/bio")
    fun getAuthorBioById(@PathVariable("id") id: Long): ResponseEntity<BioRepresentation> =
            simpleGet(id, authorRepository) { bioAssembler.toModel(Optional.ofNullable(it.bio).get()) }

    @Operation(summary = "Get all books")
    @GetMapping("/books")
    fun allBooks(): ResponseEntity<CollectionModel<BookRepresentation>> = ResponseEntity.ok(
            bookAssembler.toCollectionModel(bookRepository.findAll()))

    @Operation(summary = "Get a book by id")
    @GetMapping("/books/{id}")
    fun getBookById(@PathVariable("id") id: Long): ResponseEntity<BookRepresentation> =
            simpleGet(id, bookRepository, bookAssembler)

    @Operation(summary = "Get all authors of a book")
    @GetMapping("/books/{id}/authors")
    fun getBookAuthorsById(@PathVariable("id") id: Long): ResponseEntity<List<AuthorNameRepresentation>> =
            simpleGet(id, bookRepository) { bookAssembler.toAuthorsRepresentation(it.authors) }

    @Operation(summary = "Get all orders of a book")
    @GetMapping("/books/{id}/orders")
    fun getBookOrdersById(@PathVariable("id") id: Long): ResponseEntity<CollectionModel<OrderRepresentation>> =
            simpleGet(id, bookRepository) { orderAssembler.toCollectionModel(it.orders) }

    @Operation(summary = "Get a bio by id")
    @GetMapping("/bios/{id}")
    fun getBioById(@PathVariable("id") id: Long): ResponseEntity<BioRepresentation> =
            simpleGet(id, bioRepository, bioAssembler)

    @Operation(summary = "Get all orders")
    @GetMapping("/orders")
    fun allOrders(): ResponseEntity<CollectionModel<OrderRepresentation>> = ResponseEntity.ok(
            orderAssembler.toCollectionModel(orderRepository.findAll()))

    @Operation(summary = "Get an order by id")
    @GetMapping("/orders/{id}")
    fun getOrderById(@PathVariable("id") id: Long): ResponseEntity<OrderRepresentation> =
            simpleGet(id, orderRepository, orderAssembler)

    @Operation(summary = "Add a new book")
    @PostMapping("/books")
    fun addBook(@RequestBody book: Book): ResponseEntity<BookRepresentation> =
            simpleCreate(bookRepository, bookAssembler, book)

    @Operation(summary = "Add an order to a book")
    @PostMapping("/books/{id}/orders")
    fun addOrderToBook(@PathVariable("id") id: Long, @RequestBody order: Order): ResponseEntity<OrderRepresentation> =
            wrapCreate(
                    "/orders", orderRepository, orderAssembler, order) {
                bookRepository.findById(id).get().orders.add(this)
            }

    @Operation(summary = "Add a new author to a book")
    @PostMapping("/books/{id}/authors")
    fun addAuthorToBook(@PathVariable("id") id: Long,
                        @RequestBody author: Author): ResponseEntity<AuthorRepresentation> = wrapCreate(
            "/authors", authorRepository, authorAssembler, author) {
        books.add(bookRepository.findById(id).get())
    }

    @Operation(summary = "Add a new author")
    @PostMapping("/authors")
    fun addAuthor(@RequestBody author: Author): ResponseEntity<AuthorRepresentation> =
            simpleCreate(authorRepository, authorAssembler, author)

    @Operation(summary = "Add a new book to an author")
    @PostMapping("/authors/{id}/books")
    fun addBookToAuthor(@PathVariable("id") id: Long, @RequestBody book: Book): ResponseEntity<BookRepresentation> =
            wrapCreate(
                    "/books", bookRepository, bookAssembler, book) {
                authors.add(authorRepository.findById(id).get().apply { books.add(book) })
            }

    @Operation(summary = "Add an existing author to an existing book")
    @PatchMapping("/books/{bid}/authors/{aid}")
    fun updateBookAuthors(@PathVariable("bid") bid: Long,
                          @PathVariable("aid") aid: Long) = wrapIdempotent {
        val book = bookRepository.findById(bid).get()
        val author = authorRepository.findById(aid).get()
        if (!book.authors.contains(author)) {
            book.authors.add(author)
            author.books.add(book)
            bookRepository.save(book)
        }
    }

    @Operation(summary = "Update the firstName and lastName of an author")
    @PutMapping("/authors/{id}")
    fun updateAuthor(@PathVariable("id") id: Long, @RequestBody author: Author) = wrapIdempotent {
        authorRepository.save(authorRepository.findById(id).get().apply {
            firstName = author.firstName
            lastName = author.lastName
        })
    }

    @Operation(summary = "Update the information of a book")
    @PutMapping("/books/{id}")
    fun updateBook(@PathVariable("id") id: Long, @RequestBody book: Book) = wrapIdempotent {
        bookRepository.save(bookRepository.findById(id).get().apply {
            title = book.title
            isbn = book.isbn
            cost = book.cost
            category = book.category
            description = book.description
            year = book.year
        })
    }

    @Operation(summary = "Update an order")
    @PutMapping("/orders/{id}")
    fun updateOrder(@PathVariable("id") id: Long, @RequestBody order: Order) = wrapIdempotent {
        orderRepository.save(orderRepository.findById(id).get().apply {
            quantity = order.quantity
        })
    }

    @Operation(summary = "Update- biographical information")
    @PutMapping("/bios/{id}")
    fun updateBio(@PathVariable("id") id: Long, @RequestBody bio: Bio) = wrapIdempotent {
        bioRepository.save(bioRepository.findById(id).get().apply {
            biodata = bio.biodata
        })
    }

    @Operation(summary = "Remove an author")
    @DeleteMapping("/authors/{id}")
    fun deleteAuthor(@PathVariable("id") id: Long) = wrapIdempotent {
        authorRepository.deleteById(id)
    }

    @Operation(summary = "Remove an book")
    @DeleteMapping("/books/{id}")
    fun deleteBook(@PathVariable("id") id: Long) = wrapIdempotent {
        // Fix to make delete work. The deletion cascade does not work.
        bookRepository.delete(bookRepository.findById(id).get().apply {
            authors.forEach {
                it.books.remove(this)
            }
        })
    }

    @Operation(summary = "Remove biographical information")
    @DeleteMapping("/books/{bkId}/orders/{ordId}")
    fun deleteAuthorBio(@PathVariable("bkId") bkId: Long,
                        @PathVariable("ordId") ordId: Long) = wrapIdempotent {
        bookRepository.save(bookRepository.findById(bkId).get().apply {
            orders.removeIf { it.id == ordId }
        })
        orderRepository.deleteById(ordId)
    }
}
