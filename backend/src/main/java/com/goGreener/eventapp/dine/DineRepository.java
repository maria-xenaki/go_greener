package com.goGreener.eventapp.dine;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DineRepository extends JpaRepository<Dine, Long> {
    List<Dine> findByApprovedFalse();
    List<Dine> findByApprovedTrue();
}
