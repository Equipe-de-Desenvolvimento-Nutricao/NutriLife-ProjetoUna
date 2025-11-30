package com.nutrilife.backend.model;

import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "refeicoes")
public class Refeicao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "dieta_id", nullable = false)
    @JsonBackReference
    private Dieta dieta;

    @Column(nullable = false)
    private String nome; // Ex: "Café da manhã"

    @Column(nullable = false)
    private String horario; // Ex: "08:00"

    @Column(nullable = false)
    private int ordem; // Para ordenar as refeições

    @OneToMany(mappedBy = "refeicao", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Alimento> alimentos;

    // Construtor vazio
    public Refeicao() {}

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Dieta getDieta() {
        return dieta;
    }

    public void setDieta(Dieta dieta) {
        this.dieta = dieta;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getHorario() {
        return horario;
    }

    public void setHorario(String horario) {
        this.horario = horario;
    }

    public int getOrdem() {
        return ordem;
    }

    public void setOrdem(int ordem) {
        this.ordem = ordem;
    }

    public List<Alimento> getAlimentos() {
        return alimentos;
    }

    public void setAlimentos(List<Alimento> alimentos) {
        this.alimentos = alimentos;
    }
}