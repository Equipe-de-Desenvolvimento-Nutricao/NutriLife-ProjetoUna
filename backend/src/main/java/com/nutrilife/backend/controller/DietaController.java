package com.nutrilife.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nutrilife.backend.model.Dieta;
import com.nutrilife.backend.model.Refeicao;
import com.nutrilife.backend.model.Alimento;
import com.nutrilife.backend.repository.DietaRepository;

import java.util.List;

@RestController
@RequestMapping("/dietas")
@CrossOrigin(origins = "*")
public class DietaController {

    @Autowired
    private DietaRepository dietaRepository;

    // Cadastrar dieta completa
    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody Dieta novaDieta) {
        
        // Configura os relacionamentos
        if (novaDieta.getRefeicoes() != null) {
            for (Refeicao refeicao : novaDieta.getRefeicoes()) {
                refeicao.setDieta(novaDieta);
                
                if (refeicao.getAlimentos() != null) {
                    for (Alimento alimento : refeicao.getAlimentos()) {
                        alimento.setRefeicao(refeicao);
                    }
                }
            }
        }

        // Salva no banco
        dietaRepository.save(novaDieta);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Dieta cadastrada com sucesso!");
    }

    // Listar dietas de um nutricionista
    @GetMapping("/nutricionista/{nutricionistaId}")
    public ResponseEntity<List<Dieta>> listarPorNutricionista(@PathVariable Long nutricionistaId) {
        List<Dieta> dietas = dietaRepository.findByNutricionistaId(nutricionistaId);
        return ResponseEntity.ok(dietas);
    }

    // Listar dietas de um paciente
    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<List<Dieta>> listarPorPaciente(@PathVariable Long pacienteId) {
        List<Dieta> dietas = dietaRepository.findByPacienteId(pacienteId);
        return ResponseEntity.ok(dietas);
    }

    // Buscar dieta por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        return dietaRepository.findById(id)
                .map(dieta -> ResponseEntity.ok(dieta))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    // Deletar dieta
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        if (!dietaRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Dieta não encontrada!");
        }
        
        dietaRepository.deleteById(id);
        return ResponseEntity.ok("Dieta deletada com sucesso!");
    }
}