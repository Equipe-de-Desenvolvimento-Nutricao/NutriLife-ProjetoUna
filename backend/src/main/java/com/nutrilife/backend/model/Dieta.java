package com.nutrilife.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "dietas")
public class Dieta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long pacienteId;

    @Column(nullable = false)
    private Long nutricionistaId;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private LocalDateTime dataCriacao;

    @Column(nullable = false)
    private String status; // "ativa" ou "inativa"

    @OneToMany(mappedBy = "dieta", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Refeicao> refeicoes;


    // Construtor vazio
    public Dieta() {
        this.dataCriacao = LocalDateTime.now();
        this.status = "ativa";
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPacienteId() {
        return pacienteId;
    }

    public void setPacienteId(Long pacienteId) {
        this.pacienteId = pacienteId;
    }

    public Long getNutricionistaId() {
        return nutricionistaId;
    }

    public void setNutricionistaId(Long nutricionistaId) {
        this.nutricionistaId = nutricionistaId;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Refeicao> getRefeicoes() {
        return refeicoes;
    }

    public void setRefeicoes(List<Refeicao> refeicoes) {
        this.refeicoes = refeicoes;
    }
}
