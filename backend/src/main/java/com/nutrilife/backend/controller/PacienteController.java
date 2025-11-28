package com.nutrilife.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nutrilife.backend.model.Paciente;
import com.nutrilife.backend.repository.PacienteRepository;

import java.util.List;

@RestController
@RequestMapping("/pacientes")
@CrossOrigin(origins = "*")
public class PacienteController {

    @Autowired
    private PacienteRepository pacienteRepository;

    // Cadastrar paciente
    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody Paciente novoPaciente) {
        pacienteRepository.save(novoPaciente);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Paciente cadastrado com sucesso!");
    }

    // Listar pacientes de um nutricionista
    @GetMapping("/nutricionista/{nutricionistaId}")
    public ResponseEntity<List<Paciente>> listarPorNutricionista(@PathVariable Long nutricionistaId) {
        List<Paciente> pacientes = pacienteRepository.findByNutricionistaId(nutricionistaId);
        return ResponseEntity.ok(pacientes);
    }

    // Buscar paciente por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        return pacienteRepository.findById(id)
                .map(paciente -> ResponseEntity.ok(paciente))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(null));
    }
}
