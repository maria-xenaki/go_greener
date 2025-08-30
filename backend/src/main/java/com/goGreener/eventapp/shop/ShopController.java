package com.goGreener.eventapp.shop;

import com.goGreener.eventapp.dine.Dine;
import com.goGreener.eventapp.user.User;
import com.goGreener.eventapp.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/shops")
@RequiredArgsConstructor
public class ShopController {

    private final ShopService shopService;
    private final UserRepository userRepository;

    @PostMapping
    public Shop createShop(@RequestBody Shop shop) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        shop.setCreatedBy(user);
        shop.setApproved(false);
        return shopService.createShop(shop);
    }

    @GetMapping
    public List<Shop> getAllShops() {
        return shopService.getAllShops();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Shop> getShopById(@PathVariable Long id) {
        return shopService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/unapproved")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Shop> getUnapprovedShops() {
        return shopService.getUnapprovedShops();
    }

    @GetMapping("/approved")
    public List<Shop> getApprovedShops() {
        return shopService.getApprovedShops();
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public Shop approveShop(@PathVariable Long id) {
        return shopService.approveShop(id);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteShop(@PathVariable Long id) {
        shopService.deleteShop(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Shop updateShop(@PathVariable Long id, @RequestBody Shop updatedShop) {
        return shopService.updateShop(id, updatedShop);
    }
}
