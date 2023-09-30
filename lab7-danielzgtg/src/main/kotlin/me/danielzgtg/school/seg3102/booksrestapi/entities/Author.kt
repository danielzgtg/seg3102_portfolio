package me.danielzgtg.school.seg3102.booksrestapi.entities

import javax.persistence.*

@Entity
class Author: MyIdentifiable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    override var id: Long = 0
    var firstName: String = ""
    var lastName: String = ""

    @ManyToMany
    var books: MutableList<Book> = mutableListOf()

    @OneToOne(cascade = [CascadeType.ALL])
    var bio: Bio? = null
}
