package me.danielzgtg.school.seg3102.booksrestapi.representation

import com.fasterxml.jackson.annotation.JsonInclude
import org.springframework.hateoas.RepresentationModel
import org.springframework.hateoas.server.core.Relation

@Relation(collectionRelation = "books")
@JsonInclude(JsonInclude.Include.NON_NULL)
class BookRepresentation: RepresentationModel<BookRepresentation>() {
    var id: Long = 0
    // Changed from 'String = ""' to 'String? = null' because Hibernate insists on giving us null
    var title: String? = null
    var category: String? = null
    var isbn: String? = null
    var cost: Double = 0.0
    var year: Int = 0
    var description: String? = null
    var authors: List<AuthorNameRepresentation> = emptyList()
}
