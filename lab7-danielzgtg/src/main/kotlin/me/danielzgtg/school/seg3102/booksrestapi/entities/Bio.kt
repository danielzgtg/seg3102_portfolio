package me.danielzgtg.school.seg3102.booksrestapi.entities

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
class Bio: MyIdentifiable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    override var id: Long = 0
    var biodata: String = ""
}
