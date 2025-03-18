package com.example.atelier.service;

import com.example.atelier.dto.PageRequestDTO;
import com.example.atelier.dto.PageResponseDTO;
import com.example.atelier.dto.ProductDTO;

public interface ProductService {
    Integer register(ProductDTO productDTO);
    ProductDTO get(Integer id);
    PageResponseDTO<ProductDTO> getList(PageRequestDTO pageRequestDTO);
    void modify(ProductDTO productDTO);
    void remove(Integer id);
}
