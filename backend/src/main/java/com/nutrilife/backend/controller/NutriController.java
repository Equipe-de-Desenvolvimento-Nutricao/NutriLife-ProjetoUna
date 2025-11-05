package com.nutrilife.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nutrilife.backend.model.Nutri;
import com.nutrilife.backend.repository.NutriRepository; //os imports fazem a conexao entre as classes

@RestController //indica queclasse e um controlador REST
@RequestMapping("/nutricionistas/") //define o caminho base para a APUI
@CrossOrigin(origins = "ainda não tenho certeza qual a porta vai conectara aqui") //permite que o React Native acesse o back

public class NutriController {

}