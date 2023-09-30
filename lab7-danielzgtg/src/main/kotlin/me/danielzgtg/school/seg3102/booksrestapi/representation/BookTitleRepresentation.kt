package me.danielzgtg.school.seg3102.booksrestapi.representation

import com.fasterxml.jackson.annotation.JsonInclude
import org.springframework.hateoas.RepresentationModel

@JsonInclude(JsonInclude.Include.NON_NULL)
class BookTitleRepresentation: RepresentationModel<BookTitleRepresentation>() {
    var title: String? = null
}
