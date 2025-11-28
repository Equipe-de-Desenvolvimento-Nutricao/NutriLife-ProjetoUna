package com.nutrilife.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "pacientes")
public class Paciente {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private Long nutricionistaId;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private int idade;

    @Column(nullable = false)
    private String sexo;

    @Column(nullable = false)
    private double peso;

    @Column(nullable = false)
    private double altura;

    @Column(nullable = false)
    private String nivelAtividade;

    @Column(nullable = false)
    private int tmb;

    @Column(nullable = false)
    private int getManter;

    @Column(nullable = false)
    private int getEmagrecer;

    @Column(nullable = false)
    private int getGanhar;

    @Column(nullable = false)
    private LocalDateTime dataCadastro;

    // Construtor vazio
    public Paciente() {
        this.dataCadastro = LocalDateTime.now();
    }  // ← ADICIONA ESSA CHAVE AQUI!

    // Getters e Setters
    public Long getId() { 
        return id; 
    }

    public void setId(Long id) { 
        this.id = id; 
    }

    public Long getNutricionistaId() { 
        return nutricionistaId; 
    }

    public void setNutricionistaId(Long nutricionistaId) { 
        this.nutricionistaId = nutricionistaId; 
    }

    public String getNome() { 
        return nome; 
    }

    public void setNome(String nome) { 
        this.nome = nome; 
    }

    public int getIdade() { 
        return idade; 
    }

    public void setIdade(int idade) { 
        this.idade = idade; 
    }

    public String getSexo() { 
        return sexo; 
    }

    public void setSexo(String sexo) { 
        this.sexo = sexo; 
    }

    public double getAltura() { 
        return altura; 
    }

    public void setAltura(double altura) { 
        this.altura = altura; 
    }

    public double getPeso() { 
        return peso; 
    }

    public void setPeso(double peso) { 
        this.peso = peso; 
    }

    public String getNivelAtividade() { 
        return nivelAtividade; 
    }

    public void setNivelAtividade(String nivelAtividade) { 
        this.nivelAtividade = nivelAtividade; 
    }

    public int getTmb() { 
        return tmb; 
    }

    public void setTmb(int tmb) { 
        this.tmb = tmb; 
    }

    public int getGetManter() { 
        return getManter; 
    }

    public void setGetManter(int getManter) { 
        this.getManter = getManter; 
    }

    public int getGetEmagrecer() { 
        return getEmagrecer; 
    }

    public void setGetEmagrecer(int getEmagrecer) { 
        this.getEmagrecer = getEmagrecer; 
    }

    public int getGetGanhar() { 
        return getGanhar; 
    }

    public void setGetGanhar(int getGanhar) { 
        this.getGanhar = getGanhar; 
    }

    public LocalDateTime getDataCadastro() { 
        return dataCadastro; 
    }

    public void setDataCadastro(LocalDateTime dataCadastro) { 
        this.dataCadastro = dataCadastro; 
    }
}