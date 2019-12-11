package com.adechinan.api.storage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


/**
 * Simple, yet powerful file storage api
 * More at @@link: https://www.callicoder.com/spring-boot-file-upload-download-rest-api-example/
 */

@RestController
@RequestMapping("/api/v1/files")
@CrossOrigin
public class FileAPI {

    @Autowired
    StorageService storageService;

    List<String> files = new ArrayList<>();


    // Multiple file upload
    @PostMapping
    public FileInfo uploadFileMulti(@RequestParam("file") MultipartFile file) {
        storageService.store(file);
        files.add(file.getOriginalFilename());

        return new FileInfo(file.getOriginalFilename(),
                MvcUriComponentsBuilder
                        .fromMethodName(FileAPI.class, "getFile",
                                file.getOriginalFilename()).build().toString());
    }


    @PostMapping("/multi-upload")
    public List<FileInfo> multiUpload(@RequestParam("files") MultipartFile[] fileList) {
        List<FileInfo> fileDownloadUrls = new ArrayList<>();
        Arrays.stream(fileList)
                .forEach(file -> {
                    storageService.store(file);
                    files.add(file.getOriginalFilename());
                    fileDownloadUrls.add(
                            new FileInfo(file.getOriginalFilename(),
                                    MvcUriComponentsBuilder
                                            .fromMethodName(FileAPI.class, "getFile",
                                                    file.getOriginalFilename())
                                            .build()
                                            .toString())
                    );

                });
        return fileDownloadUrls;
    }


    @GetMapping
    public List<String> getListFiles() {
        return files.stream()
                .map(fileName -> MvcUriComponentsBuilder
                        .fromMethodName(FileAPI.class, "getFile", fileName)
                        .build()
                        .toString())
                .collect(Collectors.toList());

    }

    @GetMapping("/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storageService.loadFile(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }
}
