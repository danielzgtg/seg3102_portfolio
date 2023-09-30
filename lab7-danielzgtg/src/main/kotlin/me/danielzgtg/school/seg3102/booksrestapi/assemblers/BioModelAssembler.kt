package me.danielzgtg.school.seg3102.booksrestapi.assemblers

import me.danielzgtg.school.seg3102.booksrestapi.controller.ApiController
import me.danielzgtg.school.seg3102.booksrestapi.entities.Bio
import me.danielzgtg.school.seg3102.booksrestapi.representation.BioRepresentation
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport
import org.springframework.stereotype.Component

@Component
class BioModelAssembler : RepresentationModelAssemblerSupport<Bio, BioRepresentation>(
        ApiController::class.java, BioRepresentation::class.java) {
    override fun toModel(entity: Bio): BioRepresentation = instantiateModel(entity).apply {
        addLinkToMethodOnWithSelfRel { it.getBioById(entity.id) }
        id = entity.id
        biodata = entity.biodata
    }
}
