import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    application
    id("org.springframework.boot") version "2.7.5"
    id("io.spring.dependency-management") version "1.1.0"
    kotlin("jvm") version "1.7.21"
    kotlin("plugin.spring") version "1.7.21"
    kotlin("plugin.jpa") version "1.7.21"
}

group = "me.danielzgtg.school.seg3102"
version = "1.0.0"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jpa:2.7.5")
    implementation("org.yaml:snakeyaml:1.33") // CVE
    implementation("org.springframework.boot:spring-boot-starter-hateoas:2.7.5")
    implementation("org.jetbrains.kotlin:kotlin-reflect:1.7.21")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.7.21")
    compileOnly("org.springdoc:springdoc-openapi-ui:1.6.12")
    runtimeOnly("com.mysql:mysql-connector-j:8.0.31")
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "17"
    }
}

application {
    applicationDefaultJvmArgs = listOf("-Xms512M", "-Xmx512M")
    mainClass.set("me.danielzgtg.school.seg3102.booksrestapi.Lab7DataRestWebServicesApplicationKt")
}
