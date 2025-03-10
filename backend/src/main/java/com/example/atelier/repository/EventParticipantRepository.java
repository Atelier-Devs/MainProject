package com.example.atelier.repository;

import com.example.atelier.domain.EventParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventParticipantRepository extends JpaRepository<EventParticipant,Integer> {
}
