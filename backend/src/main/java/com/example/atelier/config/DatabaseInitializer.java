package com.example.atelier.config;

import com.example.atelier.domain.*;
import com.example.atelier.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;

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
                                   ProductRepository productRepo,
                                   UserRepository userRepository,
                                   PasswordEncoder passwordEncoder) {
        return args -> {

            // 관리자 계정이 없을 경우 생성
            if (userRepository.count() == 0 || userRepository.findByEmail("admin@atelier.com").isEmpty()) {
                User admin = User.builder()
                        .name("관리자")
                        .email("admin@atelier.com")
                        .password(passwordEncoder.encode("admin1234")) // 암호화 된 비밀번호
                        .phone("010-0000-0000")
                        .roleNames(User.Role.STAFF)
                        .totalSpent(BigDecimal.ZERO)
                        .refundableAmount(BigDecimal.ZERO)
                        .build();

                userRepository.save(admin);
            }

            // 객실 초기값 설정
            if (residenceRepo.count() == 0) {
                residenceRepo.saveAll(List.of(
                        new Residence(null, Residence.Type.ROOM, "디럭스 파크 뷰 룸", "싱그러운 자연을 배경으로 즐기는 조용한 나만의 공간",
                                new BigDecimal("250000"), 2, Residence.Status.AVAILABLE, new ArrayList<>()),
                        new Residence(null, Residence.Type.ROOM, "그랜드 디럭스 룸", "상쾌한 아침과 함께하는 휴식",
                                new BigDecimal("180000"), 2, Residence.Status.AVAILABLE, new ArrayList<>()),
                        new Residence(null, Residence.Type.ROOM, "프리미어 룸", "일상에서 벗어나 누리는 편안함",
                                new BigDecimal("90000"), 2, Residence.Status.AVAILABLE, new ArrayList<>()),
                        new Residence(null, Residence.Type.ROOM, "프리미어 스위트", "특별한 사람과 함께 소중한 추억을 장식하는 공간",
                                new BigDecimal("50000"), 2, Residence.Status.AVAILABLE, new ArrayList<>()),
                        new Residence(null, Residence.Type.ROOM, "디럭스 스위트", "넓은 거실과 정교한 인테리어가 선사하는 편안함",
                                new BigDecimal("150000"), 2, Residence.Status.AVAILABLE, new ArrayList<>()),
                        new Residence(null, Residence.Type.ROOM, "코너 스위트", "한강 뷰와 함께하는 프라이빗하고 특별한 공간",
                                new BigDecimal("200000"), 2, Residence.Status.AVAILABLE, new ArrayList<>())
                ));
            }

            // 레스토랑 초기값 설정
            if (restaurantRepo.count() == 0) {
                restaurantRepo.saveAll(List.of(
                        new Restaurant("StayModern 레스토랑 - 모던 유러피안 스타일의 파인 다이닝의 정석", "25000"),
                        new Restaurant("스테이크 뷔페 - 최고급 스테이크와 다채로운 요리가 만나는 미식의 정점", "30000"),
                        new Restaurant("쁘띠 빠니에 - 프렌치 감성의 상큼한 브런치 카페", "22000"),
                        new Restaurant("오르세 - 퓨전 한식 고급 다이닝", "27000"),
                        new Restaurant("아틀리에 키친 - 호텔 아틀리에의 헤드 셰프의 특선 요리 모음", "26000"),
                        new Restaurant("Bar 37 루프탑 - 시티뷰 칵테일 바", "32000")
                ));
            }

            // 베이커리 초기값 설정
            if (bakeryRepo.count() == 0) {
                bakeryRepo.saveAll(List.of(
                        new Bakery("프리미엄 크루아상 - 버터 풍미 가득한 정통 프렌치 크루아상", "5000"),
                        new Bakery("마카롱 세트 - 6종 맛의 달콤한 브라우니 세트", "7000"),
                        new Bakery("브라우니 - 진한 초콜릿의 풍미가 가득한 수제 브라우니", "4500"),
                        new Bakery("아틀리에 딸기 케이크 - 생크림과 제철딸기의 하모니로 완성되는 아틀리에의 시그니처 딸기 케이크", "15000"),
                        new Bakery("스콘 (플레인/크랜베리) - 고소하고 부드러운 맛이 풍부한 영국식 스콘", "4800"),
                        new Bakery("레몬 파운드 케이크 - 상큼한 시트러스 향이 가득한 파운드 케이크", "6200")
                ));
            }

            // 룸서비스 초기값 설정
            if (roomServiceRepo.count() == 0) {
                roomServiceRepo.saveAll(List.of(
                        new RoomService("조식 세트 - 호텔식 아침 (계란, 빵, 커피 포함)", "12000"),
                        new RoomService("중식 정식 - 한식 또는 양식 중 택 1", "16000"),
                        new RoomService("석식 코스 - 풀코스 정찬과 디저트 제공", "21000"),
                        new RoomService("야식 세트 - 최고급 보리 맥주와 함께 즐기는 프라이드 치킨", "8000"),
                        new RoomService("위스키 하프 보틀 - 다양한 안주와 함께하는 12년산 스카치 위스키", "45000"),
                        new RoomService("샴페인 하우스 - 다양한 고급 스파클링 와인 제공", "60000")
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
            // Residence는 room*_*도 있기 때문에 room*로 나눈 후 room*_*작업 진행
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