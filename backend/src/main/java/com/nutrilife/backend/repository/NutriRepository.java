package com.nutrilife.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.nutrilife.backend.model.Nutri;

@Repository
public interface NutriRepository extends JpaRepository<Nutri, Long> {
    Optional<Nutri> findByEmail(String email);
}