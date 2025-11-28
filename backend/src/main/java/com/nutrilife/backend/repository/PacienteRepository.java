package com.nutrilife.backend.repository;

import com.nutrilife.backend.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    List<Paciente> findByNutricionistaId(Long nutricionistaId);
}