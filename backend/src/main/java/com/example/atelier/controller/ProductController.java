package com.example.atelier.controller;

import com.example.atelier.dto.PageRequestDTO;
import com.example.atelier.dto.PageResponseDTO;
import com.example.atelier.dto.ProductDTO;
import com.example.atelier.service.ProductService;
import com.example.atelier.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@RequestMapping("/api/atelier/")
public class ProductController {

    private final ProductService productService;
    private final CustomFileUtil fileUtil;

    // 파일 등록
//    @PostMapping("/add")
//    public ResponseEntity<?> register(ProductDTO productDTO) {
//        try {
//            log.info("register() 컨트롤러 실행됨 - productDTO: {}", productDTO);
//
//            // 컨트롤러에서는 파일을 저장하지 않고, DTO를 그대로 서비스로 전달
//            Integer id = productService.register(productDTO);
//
//            // 정상 처리 응답
//            return ResponseEntity.ok(id);
//
//        } catch (NoSuchElementException e) {
//            log.error("해당 데이터가 존재하지 않습니다: {}", e.getMessage());
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 데이터를 찾을 수 없습니다.");
//        } catch (Exception e) {
//            log.error("상품 등록 중 오류 발생: {}", e.getMessage(), e);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("상품 등록 중 오류가 발생했습니다.");
//        }
//    }

    // 파일 보여주기(프론트에서 객실 출력)
    @GetMapping("/view/{fileName}") // img src = "/view/1234_송준항.jpg"
    public ResponseEntity<Resource> viewFileGET(@PathVariable String fileName) {
        try {
            log.info("요청된 파일명: {}", fileName);

            // URL 디코딩 (특수 문자 포함 가능성 고려)
            String decodedFileName = URLDecoder.decode(fileName, StandardCharsets.UTF_8);
            log.info("디코딩된 파일명: {}", decodedFileName);

            return fileUtil.getFile(decodedFileName);
        } catch (Exception e) {
            log.error("파일 조회 오류 발생: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    // 목록 조회
    @GetMapping("/list")
    public PageResponseDTO<ProductDTO> list(PageRequestDTO pageRequestDTO) {
        log.info("list............." + pageRequestDTO);
        return productService.getList(pageRequestDTO);
    }

    // 조회
    @GetMapping("/{id}")
    public ProductDTO read(@PathVariable Integer id) {
        return productService.get(id);
    }

    // 수정
    @PutMapping("/{id}")
    public Map<String, String> modify(@PathVariable Integer id, ProductDTO productDTO) {
        productDTO.setId(id);
        ProductDTO oldProductDTO = productService.get(id);

        // 기존의 파일들(데이터베이스에 존재하는 파일들 - 수정 과저엥서 삭제되었을 수 있음)
        List<String> oldFileNames = oldProductDTO.getUploadFileNames();
        // 새로 업로드 해야 하는 파일들
        List<MultipartFile> files = productDTO.getFiles();
        // 새로 업로드되어서 만들어진 파일 이름들
        List<String> currentUploadFileNames = fileUtil.saveFiles(files);
        // 화면에서 변화 없이 계속 유지된 파일들
        List<String> uploadedFileNames = productDTO.getUploadFileNames();
        // 유지되는 파일들 + 새로 업로드된 파일 이름들이 저장해야 하는 파일 목록이 됨
        if (currentUploadFileNames != null && currentUploadFileNames.size() > 0) {
            uploadedFileNames.addAll(currentUploadFileNames);
        }

        // 수정 작업
        productService.modify(productDTO);
        if (oldFileNames != null && oldFileNames.size() > 0) {
            // 지워야 하는 파일 목록 찾기
            // 예전 파일들 중에서 지워져야 하는 파일이름들
            List<String> removeFiles = oldFileNames
                    .stream()
                    .filter(fileName -> uploadedFileNames.indexOf(fileName) == -1)
                    .collect(Collectors.toList());
            // 실제 파일 삭제
            fileUtil.deleteFiles(removeFiles);
        }
        return Map.of("RESULT", "SUCCESS");
    }

    // 삭제
    @DeleteMapping("/{id}")
    public Map<String, String> remove(@PathVariable Integer id) {
        // 삭제해야 할 파일들 알아내기
        List<String> oldFileNames = productService.get(id)
                .getUploadFileNames();
        productService.remove(id);
        fileUtil.deleteFiles(oldFileNames);
        return Map.of("RESULT", "SUCCESS");
    }
}