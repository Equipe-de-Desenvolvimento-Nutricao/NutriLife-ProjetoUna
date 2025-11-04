package com.nutrilife.backend.model;

public class Nutri {
    private Long id;
    private String nome;
    private String email;
    private String senha;

    public Nutri() {} //construtor vazio

    public Nutri(String nome, String email, String senha) {
            this.nome = nome;
            this.email = email;
            this.senha = senha;
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
}