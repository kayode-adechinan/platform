package com.adechinan.api;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
@CrossOrigin
public class ProductAPI {

    private final ProductRepository productRepository;

    @PostMapping
    public Product save(@RequestBody Product product){
        return this.productRepository.save(product);
    }

    @GetMapping
    public Page<Product> findAll(Pageable pageable){
        return this.productRepository.findAll(pageable);
    }

    @GetMapping("/{id}")
    public  Product findById(@PathVariable Long id){
        return this.productRepository.findById(id)
                .orElseThrow();
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable Long id, @RequestBody Product product){
        return this.productRepository.findById(id)
                .map(p-> {
                    p.setName(product.getName());
                    p.setImage(product.getImage());
                    return this.productRepository.save(p);
                }).orElseThrow();
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        this.productRepository.deleteById(id);
    }

}

