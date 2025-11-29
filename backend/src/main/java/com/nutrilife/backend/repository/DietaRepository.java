package com.nutrilife.backend.repository;

import com.nutrilife.backend.model.Dieta;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DietaRepository extends JpaRepository<Dieta, Long> {
    List<Dieta> findByNutricionistaId(Long nutricionistaId);
    List<Dieta> findByPacienteId(Long pacienteId);
}