package com.example.atelier.config;

import com.example.atelier.domain.Bakery;
import com.example.atelier.domain.Membership;
import com.example.atelier.domain.Restaurant;
import com.example.atelier.domain.RoomService;
import com.example.atelier.repository.BakeryRepository;
import com.example.atelier.repository.MembershipRepository;
import com.example.atelier.repository.RestaurantRepository;
import com.example.atelier.repository.RoomServiceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DatabaseInitializer {

    @Bean
    CommandLineRunner initDatabase(RestaurantRepository restaurantRepo,
                                   BakeryRepository bakeryRepo,
                                   RoomServiceRepository roomServiceRepo,
                                   MembershipRepository membershipRepo) {
        return args -> {
            // 레스토랑 초기값 설정
            if (restaurantRepo.count() == 0) {
                restaurantRepo.saveAll(List.of(
                        new Restaurant("StayModernRestaurant", "20000"),
                        new Restaurant("StakeBuffet", "25000"),
                        new Restaurant("PetitPanier", "18000"),
                        new Restaurant("Orsay", "15000"),
                        new Restaurant("AtelierQuisine", "17000"),
                        new Restaurant("Bar37", "22000")
                ));
            }
            // 베이커리 초기값 설정
            if (bakeryRepo.count() == 0) {
                bakeryRepo.saveAll(List.of(
                        new Bakery("PremiumCroissant", "5000"),
                        new Bakery("Macaroon", "3000"),
                        new Bakery("Brownie", "4000"),
                        new Bakery("Baguette", "6000"),
                        new Bakery("Scone", "8000"),
                        new Bakery("LemonPoundCake", "9000")
                ));
            }
            // 룸서비스 초기값 설정
            if (roomServiceRepo.count() == 0) {
                roomServiceRepo.saveAll(List.of(
                        new RoomService("Breakfast", "12000"),
                        new RoomService("Lunch", "18000"),
                        new RoomService("Dinner", "25000"),
                        new RoomService("MidnightSnack", "10000"),
                        new RoomService("Whiskey", "300000"),
                        new RoomService("champagne", "300000")
                ));
            }
            // 멤버십 기본 할인율 설정
            if (membershipRepo.count() == 0) {
                membershipRepo.saveAll(List.of(
                        new Membership(null, null, Membership.Category.TRINITY, new BigDecimal("0.30"), null, Membership.Status.ACTIVE),
                        new Membership(null, null, Membership.Category.DIAMOND, new BigDecimal("0.20"), null, Membership.Status.ACTIVE),
                        new Membership(null, null, Membership.Category.GOLD, new BigDecimal("0.10"), null, Membership.Status.ACTIVE)
                ));
            }
        };
    }
}