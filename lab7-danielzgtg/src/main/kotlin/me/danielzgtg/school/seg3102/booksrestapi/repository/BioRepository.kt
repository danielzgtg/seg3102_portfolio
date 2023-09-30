package me.danielzgtg.school.seg3102.booksrestapi.repository

import me.danielzgtg.school.seg3102.booksrestapi.entities.Bio
import org.springframework.data.repository.CrudRepository

interface BioRepository: CrudRepository<Bio, Long>
