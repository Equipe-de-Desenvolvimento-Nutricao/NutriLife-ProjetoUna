package com.nutrilife.backend.repository;

import com.nutrilife.backend.model.Alimento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlimentoRepository extends JpaRepository<Alimento, Long> {
}