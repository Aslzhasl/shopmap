package com.example.shopmap.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
@Controller
public class Mapcontroller {
    @GetMapping("/")
    public String index() {
        return "index"; // This will return the index.html template
    }
}
