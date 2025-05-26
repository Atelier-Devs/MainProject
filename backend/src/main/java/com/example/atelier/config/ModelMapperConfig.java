//package com.example.atelier.config;
//
//import com.example.atelier.domain.*;
//import com.example.atelier.dto.EnrollmentRequestDTO;
//import com.example.atelier.dto.LoginRequestDTO;
//import org.modelmapper.ModelMapper;
//import org.modelmapper.TypeMap;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class ModelMapperConfig {
//
//    @Bean
//    public ModelMapper modelMapper() {
//        ModelMapper modelMapper = new ModelMapper();
//
//        configureEnrollmentMapping(modelMapper);
//        configureLoginMapping(modelMapper);  // 🔥 추가된 부분
//
//        return modelMapper;
//    }
//
//    private void configureEnrollmentMapping(ModelMapper modelMapper) {
//        TypeMap<EnrollmentRequestDTO, Enrollment> typeMap =
//                modelMapper.createTypeMap(EnrollmentRequestDTO.class, Enrollment.class);
//
//        typeMap.addMappings(mapper -> {
//            mapper.map(dto -> {
//                User user = new User();
//                user.setUserId(dto.getStudentId());
//                return user;
//            }, Enrollment::setStudent);
//
//            mapper.map(dto -> {
//                ClassEntity classEntity = new ClassEntity();
//                classEntity.setId(dto.getClassId());
//                return classEntity;
//            }, Enrollment::setEnrolledClassEntity);
//        });
//    }
//
//    private void configureLoginMapping(ModelMapper modelMapper) {
//        // 🔐 LoginRequestDTO → User
//        modelMapper.typeMap(LoginRequestDTO.class, User.class).addMappings(mapper -> {
//            mapper.map(LoginRequestDTO::getEmail, User::setEmail);
//            mapper.map(LoginRequestDTO::getPassword, User::setPassword);
//        });
//    }
//}
