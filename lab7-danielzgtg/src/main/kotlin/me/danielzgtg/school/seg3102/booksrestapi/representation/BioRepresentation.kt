package me.danielzgtg.school.seg3102.booksrestapi.representation

import com.fasterxml.jackson.annotation.JsonInclude
import org.springframework.hateoas.RepresentationModel

@JsonInclude(JsonInclude.Include.NON_NULL)
class BioRepresentation : RepresentationModel<BioRepresentation>() {
    var id: Long = 0
    var biodata: String? = null
}
