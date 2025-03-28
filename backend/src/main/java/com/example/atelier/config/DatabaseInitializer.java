package com.example.atelier.config;

import com.example.atelier.domain.*;
import com.example.atelier.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Sort;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class DatabaseInitializer {

    @Bean
    CommandLineRunner initDatabase(RestaurantRepository restaurantRepo,
                                   BakeryRepository bakeryRepo,
                                   RoomServiceRepository roomServiceRepo,
                                   MembershipRepository membershipRepo,
                                   ResidenceRepository residenceRepo,
                                   ProductRepository productRepo) {
        return args -> {
            // 객실 초기값 설정
            if (residenceRepo.count() == 0) {
                residenceRepo.saveAll(List.of(
                        new Residence(null, Residence.Type.ROOM, "디럭스 파크 뷰 룸", "싱그러운 자연을 배경으로 즐기는 조용한 휴식 공간", new BigDecimal("250000"), 2, Residence.Status.AVAILABLE, new ArrayList<>()),
                        new Residence(null, Residence.Type.ROOM, "그랜드 디럭스 룸", "상쾌한 아침과 함께하는 품격 있는 휴식", new BigDecimal("180000"), 2, Residence.Status.AVAILABLE, new ArrayList<>()),
                        new Residence(null, Residence.Type.ROOM, "프리미어 룸", "최고급 침대에서 누리는 편안함과 여유로운 휴식", new BigDecimal("90000"), 2, Residence.Status.AVAILABLE, new ArrayList<>()),
                        new Residence(null, Residence.Type.ROOM, "프리미어 스위트", "특별한 사람과 함께하는 우아한 추억의 한조각", new BigDecimal("50000"), 2, Residence.Status.AVAILABLE, new ArrayList<>()),
                        new Residence(null, Residence.Type.ROOM, "디럭스 스위트", "넓은 거실과 정교한 인테리어가 선사하는 품격 높은 경험", new BigDecimal("150000"), 2, Residence.Status.AVAILABLE, new ArrayList<>()),
                        new Residence(null, Residence.Type.ROOM, "코너 스위트", "한강 뷰와 함께하는 프라이빗하고 특별한 공간", new BigDecimal("200000"), 2, Residence.Status.AVAILABLE, new ArrayList<>())
                ));
            }

            // 레스토랑 초기값 설정
            if (restaurantRepo.count() == 0) {
                restaurantRepo.saveAll(List.of(
                        new Restaurant("StayModern 레스토랑 - 모던 유러피안 스타일", "25000"),
                        new Restaurant("스테이크 뷔페 - 최상급 스테이크 무한 제공", "30000"),
                        new Restaurant("쁘띠 빠니에 - 프렌치 감성의 브런치 카페", "22000"),
                        new Restaurant("오르세 - 파리풍 고급 다이닝", "27000"),
                        new Restaurant("아틀리에 키친 - 감성 비스트로", "26000"),
                        new Restaurant("Bar 37 루프탑 - 시티뷰 칵테일 바", "32000")
                ));
            }

            // 베이커리 초기값 설정
            if (bakeryRepo.count() == 0) {
                bakeryRepo.saveAll(List.of(
                        new Bakery("프리미엄 크루아상 - 버터 풍미 가득한 정통 프렌치", "5000"),
                        new Bakery("마카롱 세트 - 6종 맛의 달콤한 조화", "7000"),
                        new Bakery("브라우니 - 진한 초콜릿의 풍미", "4500"),
                        new Bakery("아틀리에 딸기 케이크 - 생크림과 제철딸기의 환상 조합", "15000"),
                        new Bakery("스콘 (플레인/크랜베리) - 고소하고 부드러운 맛", "4800"),
                        new Bakery("레몬 파운드 케이크 - 상큼한 시트러스 향", "6200")
                ));
            }

            // 룸서비스 초기값 설정
            if (roomServiceRepo.count() == 0) {
                roomServiceRepo.saveAll(List.of(
                        new RoomService("조식 세트 - 호텔식 아침 (계란, 빵, 커피 포함)", "12000"),
                        new RoomService("중식 정식 - 한식 또는 양식 중 택 1", "16000"),
                        new RoomService("석식 코스 - 풀코스 정찬과 디저트", "21000"),
                        new RoomService("야식 세트 - 간편하게 즐기는 늦은 밤 간식", "8000"),
                        new RoomService("위스키 하프 보틀 - 12년산 스카치 위스키", "45000"),
                        new RoomService("샴페인 하우스 - 고급 스파클링 와인", "60000")
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

            // Bakery 이미지 등록
            List<Bakery> bakeries = bakeryRepo.findAll(Sort.by("id")); // ID순 정렬

            for (int i = 0; i < bakeries.size(); i++) {
                Bakery bakery = bakeries.get(i);
                String fileName = "bakery" + (i + 1) + ".jpg";

                Product p = new Product();
                p.setFileName(fileName);
                p.setFilePath("upload/bakery/" + fileName);
                p.setFileType("image/jpeg");
                p.setDelFlag(false);
                p.setBakery(bakery);
                productRepo.save(p);
            }

            // Residence 이미지 등록
            List<Residence> residences = residenceRepo.findAll(Sort.by("id")); // id 기준 정렬

            for (int i = 0; i < residences.size(); i++) {
                Residence residence = residences.get(i);
                String roomKey = "room" + (i + 1); // room1 ~ room6

                for (int j = 0; j < 3; j++) {
                    String fileName = roomKey + (j == 0 ? ".jpg" : "_" + j + ".jpg"); // room1.jpg, room1_1.jpg, ...

                    Product p = new Product();
                    p.setFileName(fileName);
                    p.setFilePath(fileName); // 또는 "upload/residence/" + fileName
                    p.setFileType("image/jpeg");
                    p.setDelFlag(false);
                    p.setResidence(residence);
                    productRepo.save(p);
                }
            }

            // Restaurant 이미지 등록
            List<Restaurant> restaurants = restaurantRepo.findAll(Sort.by("id")); // ID순 정렬

            for (int i = 0; i < restaurants.size(); i++) {
                Restaurant restaurant = restaurants.get(i);
                String fileName = "restaurant" + (i + 1) + ".jpg";

                Product p = new Product();
                p.setFileName(fileName);
                p.setFilePath("upload/restaurant/" + fileName);
                p.setFileType("image/jpeg");
                p.setDelFlag(false);
                p.setRestaurant(restaurant);
                productRepo.save(p);
            }

            // RoomService 이미지 등록
            List<RoomService> roomServices = roomServiceRepo.findAll(Sort.by("id")); // ID순 정렬

            for (int i = 0; i < roomServices.size(); i++) {
                RoomService rs = roomServices.get(i);
                String fileName = "roomservice" + (i + 1) + ".jpg";

                Product p = new Product();
                p.setFileName(fileName);
                p.setFilePath("upload/roomservice/" + fileName);
                p.setFileType("image/jpeg");
                p.setDelFlag(false);
                p.setRoomService(rs);
                productRepo.save(p);
            }
        };
    }
}