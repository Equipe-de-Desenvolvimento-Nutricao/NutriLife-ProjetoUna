package com.nutrilife.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nutrilife.backend.dto.LoginRequest;
import com.nutrilife.backend.model.Nutri;
import com.nutrilife.backend.repository.NutriRepository;

import java.util.Optional;

@RestController
@RequestMapping("/nutricionistas")
@CrossOrigin(origins = "*")
public class NutriController {

    @Autowired
    private NutriRepository nutriRepository;

    // ============================
    // CADASTRO
    // ============================
    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody Nutri novoNutri) {

        // Verifica se email já existe
        Optional<Nutri> existente = nutriRepository.findByEmail(novoNutri.getEmail());

        if (existente.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Este email já está cadastrado!");
        }

        // Salva no banco
        nutriRepository.save(novoNutri);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Cadastro realizado com sucesso!");
    }

// ============================
// LOGIN
// ============================
@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    System.out.println("🔵 Tentativa de login recebida");
    System.out.println("Email: " + loginRequest.getEmail());
    
    Optional<Nutri> nutriOpt = nutriRepository.findByEmail(loginRequest.getEmail());

    if (nutriOpt.isEmpty()) {
        System.out.println("❌ Email não encontrado");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Email inválido!");
    }

    Nutri nutri = nutriOpt.get();

    if (!nutri.getSenha().equals(loginRequest.getSenha())) {
        System.out.println("❌ Senha incorreta");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Senha incorreta!");
    }
    
    System.out.println("✅ Login bem-sucedido! ID: " + nutri.getId());
    
    // ⭐ RETORNA O OBJETO COMPLETO DO NUTRICIONISTA
    return ResponseEntity.ok(nutri);
}
}