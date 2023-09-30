package me.danielzgtg.school.seg3102.booksrestapi.representation

import com.fasterxml.jackson.annotation.JsonInclude
import org.springframework.hateoas.RepresentationModel

@JsonInclude(JsonInclude.Include.NON_NULL)
class AuthorNameRepresentation: RepresentationModel<AuthorNameRepresentation>() {
    var firstName: String? = null
    var lastName: String? = null
}
