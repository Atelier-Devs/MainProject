package com.example.atelier.util;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Component
@Slf4j
@RequiredArgsConstructor
public class CustomFileUtil {

    @Value("${com.example.atelier.backend.upload.path}")
    private String uploadPath;

    @PostConstruct // 애플리케이션 시작 시 업로드 폴더 생성
    public void init() {
        File uploadFolder = new File(uploadPath);
        if (!uploadFolder.exists()) {
            uploadFolder.mkdirs(); // 폴더가 없으면 생성
        }
        uploadPath = uploadFolder.getAbsolutePath();
        log.info("파일 업로드 경로: " + uploadPath);
    }

    /**
     * 파일 저장 메서드 (Product 엔티티에 연결될 파일 저장)
     *
     * @param files 업로드할 파일 리스트
     * @return 저장된 파일들의 이름 리스트
     */
    public List<String> saveFiles(List<MultipartFile> files) {
        if (files == null || files.isEmpty()) {
            log.warn("전달된 파일이 없습니다.");
            return Collections.emptyList();
        }

        List<String> uploadNames = new ArrayList<>();

        // 업로드 폴더가 없으면 생성
        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) {
            boolean created = uploadDir.mkdirs();
            log.info("업로드 폴더 생성 여부: {}", created ? "성공" : "실패");
        }

        for (MultipartFile multipartFile : files) {
            if (multipartFile.isEmpty()) {
                log.warn("빈 파일이 전달됨 - 저장하지 않음");
                continue;
            }

            // 저장할 파일명 (UUID + 원본 파일명)
            String savedName = UUID.randomUUID().toString() + "_" + multipartFile.getOriginalFilename();
            Path savePath = Paths.get(uploadPath, savedName);

            try {
                // 파일 저장
                Files.copy(multipartFile.getInputStream(), savePath);
                uploadNames.add(savedName);
                log.info("원본 파일 저장 완료: {}", savePath.toAbsolutePath());

                // 이미지 파일이면 썸네일 생성
                String contentType = multipartFile.getContentType();
                if (contentType != null && contentType.startsWith("image")) {
                    // 썸네일 파일명 설정
                    Path thumbnailPath = Paths.get(uploadPath, "s_" + savedName);

                    // 썸네일 생성 (200x200 크기)
                    Thumbnails.of(savePath.toFile())
                            .size(200, 200)
                            .toFile(thumbnailPath.toFile());

                    log.info("썸네일 생성 완료: {}", thumbnailPath.toAbsolutePath());
                }
            } catch (IOException e) {
                log.error("파일 저장 중 오류 발생: {}", multipartFile.getOriginalFilename(), e);
                throw new RuntimeException(e);
            }
        }
        log.info("최종 저장된 파일 개수: {}", uploadNames.size());
        return uploadNames;
    }

    /**
     * 업로드된 파일 제공 (브라우저에서 보기)
     *
     * @param fileName 파일명
     * @return ResponseEntity 형태로 파일 제공
     */
    public ResponseEntity<Resource> getFile(String fileName) {
        String fullPath = uploadPath + File.separator + fileName;
        File file = new File(fullPath);

        log.info("📂 파일 조회 시도: {}", fullPath);

        if (!file.exists()) {
            log.error("🚨 파일이 존재하지 않음: {}", fullPath);
            return ResponseEntity.notFound().build();
        }

        HttpHeaders headers = new HttpHeaders();
        try {
            headers.add("Content-Type", Files.probeContentType(file.toPath()));
        } catch (IOException e) {
            log.error("🚨 파일 타입 확인 중 오류 발생", e);
            return ResponseEntity.internalServerError().build();
        }

        return ResponseEntity.ok().headers(headers).body(new FileSystemResource(file));
    }

    /**
     * 파일 삭제
     *
     * @param fileNames 삭제할 파일 리스트
     */
    public void deleteFiles(List<String> fileNames) {
        if (fileNames == null || fileNames.isEmpty()) {
            return;
        }

        for (String fileName : fileNames) {
            Path filePath = Paths.get(uploadPath, fileName);
            Path thumbnailPath = Paths.get(uploadPath, "s_" + fileName); // 썸네일 경로

            try {
                Files.deleteIfExists(filePath);       // 원본 파일 삭제
                Files.deleteIfExists(thumbnailPath);  // 썸네일 파일 삭제
            } catch (IOException e) {
                throw new RuntimeException("파일 삭제 실패: " + e.getMessage());
            }
        }
    }
}