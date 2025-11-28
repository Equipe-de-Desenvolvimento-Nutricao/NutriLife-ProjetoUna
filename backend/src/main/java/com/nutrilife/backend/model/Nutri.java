package com.nutrilife.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.*;

@Entity //indica que a classe é uma entidade JPA
@Table(name = "nutricionistas") //define o nome da tabela no banco de dados
public class Nutri {

    @Id //mostra a chave prima
    @GeneratedValue(strategy = GenerationType.IDENTITY) //vai gerar automaticamente o Isd kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
    private Long id;

    @Column(nullable = false) //garante que nome n seja nulo no banco de dados
    private String nome;

    @Column(unique = true, nullable = false) //garante que o email seja unico no banco de dados
    private String email;

    @Column(nullable = false) //garante que senha n seja nulo no banco de dados
    private String senha;

    @Column(unique = true, nullable = false)
    private int crm;

    public Nutri() {} //construtor vazio

    public Nutri(String nome, String email, String senha, int crm) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.crm = crm;

    } //construtor com coisas dentro

    //get e set
    public Long getId(){ //obter dados
        return id;
    }

    public void setId(Long id){
        this.id = id;
    } //manipular dados S2

    public String getNome(){
        return nome;
    }

    public void setNome(String nome){
        this.nome = nome;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getSenha(){
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public int getCrm() {
        return crm;
    }
    
    public void setCrm(int crm) {
        this.crm = crm;
    }
}