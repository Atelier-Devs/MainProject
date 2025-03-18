package com.example.atelier.service;

import com.example.atelier.domain.*;
import com.example.atelier.dto.PageRequestDTO;
import com.example.atelier.dto.PageResponseDTO;
import com.example.atelier.dto.ProductDTO;
import com.example.atelier.repository.*;
import com.example.atelier.util.CustomFileUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CustomFileUtil fileUtil;
    private final ModelMapper modelMapper;

    @Override
    public Integer register(ProductDTO productDTO) {
        log.info("register() 실행됨: ProductDTO = {}", productDTO);

        // 여기서만 파일 저장을 수행
        List<MultipartFile> files = productDTO.getFiles();
        if (files != null && !files.isEmpty()) {
            List<String> uploadFileNames = fileUtil.saveFiles(files);
            productDTO.setUploadFileNames(uploadFileNames);
            log.info("저장된 파일 개수: {}", uploadFileNames.size());
        }

        Product product = modelMapper.map(productDTO, Product.class);
        productRepository.save(product);
        log.info("✅ Product 저장 완료: {}", product.getId());
        return product.getId();
    }

    @Override
    public ProductDTO get(Integer id) {
        Product product = productRepository.selectOne(id)
                .orElseThrow(() -> new RuntimeException("해당 상품을 찾을 수 없습니다."));
        return modelMapper.map(product, ProductDTO.class);
    }

    @Override
    public PageResponseDTO<ProductDTO> getList(PageRequestDTO pageRequestDTO) {
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("id").descending());

        Page<Product> result = productRepository.findAll(pageable);

        List<ProductDTO> dtoList = result.get().map(product -> {
            ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
            if (product.getFileName() != null) {
                productDTO.setUploadFileNames(List.of(product.getFileName()));
            } else {
                productDTO.setUploadFileNames(new ArrayList<>());
            }
            return productDTO;
        }).collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        return PageResponseDTO.<ProductDTO>withAll()
                .dtoList(dtoList)
                .totalCount(totalCount)
                .pageRequestDTO(pageRequestDTO)
                .build();
    }

    @Override
    public void modify(ProductDTO productDTO) {
        Product product = productRepository.findById(productDTO.getId())
                .orElseThrow(() -> new RuntimeException("해당 상품을 찾을 수 없습니다."));

        modelMapper.map(productDTO, product);

        productRepository.save(product);
    }

    @Override
    public void remove(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 상품을 찾을 수 없습니다."));

        // 연관 관계 제거 (FK null 처리)
        product.setBakery(null);
        product.setResidence(null);
        product.setRoomService(null);
        product.setRestaurant(null);

        productRepository.save(product); // 변경 사항 먼저 저장

        // 이제 안전하게 삭제 가능
        productRepository.deleteById(id);
        log.info("Product 삭제 완료: {}", id);
    }
}