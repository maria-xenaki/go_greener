package com.goGreener.eventapp.shop;

import com.goGreener.eventapp.shop.Shop;
import com.goGreener.eventapp.tag.Tag;
import com.goGreener.eventapp.tag.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ShopService {

    private final ShopRepository shopRepository;
    private final TagRepository tagRepository;

    //@Override
    public Shop createShop(Shop shop) {
        // If tags come in with just names, fetch or create tags
        List<Tag> resolvedTags = new ArrayList<>();

        if (shop.getTags() != null) {
            for (Tag tag : shop.getTags()) {
                String name = tag.getName().trim();

                Tag resolved = tagRepository.findByName(name)
                        .orElseGet(() -> tagRepository.save(new Tag(null, name)));

                resolvedTags.add(resolved);
            }
        }
        shop.setTags(resolvedTags);
        shop.setApproved(false);

        return shopRepository.save(shop);
    }

    //public Shop createShop(Shop shop) {
//        return shopRepository.save(shop);
//    }

    public List<Shop> getAllShops() {
        return shopRepository.findAll();
    }

    public List<Shop> getUnapprovedShops() {
        return shopRepository.findByApprovedFalse();
    }

    public Shop approveShop(Long id) {
        Shop s = shopRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shop not found"));
        s.setApproved(true);
        return shopRepository.save(s);
    }

    public void deleteShop(Long id) {
        shopRepository.deleteById(id);
    }

    public Shop updateShop(Long id, Shop updated) {
        Shop s = shopRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shop not found"));
        s.setTitle(updated.getTitle());
        s.setDescription(updated.getDescription());
        s.setCity(updated.getCity());
        s.setLink(updated.getLink());
        s.setAddress(updated.getAddress());
        //s.setTags(updated.getTags());

        // Handle tags properly
        List<Tag> resolvedTags = new ArrayList<>();
        if (updated.getTags() != null) {
            for (Tag tag : updated.getTags()) {
                String name = tag.getName().trim();
                Tag resolved = tagRepository.findByName(name)
                        .orElseGet(() -> tagRepository.save(new Tag(null, name)));
                resolvedTags.add(resolved);
            }
        }
        s.setTags(resolvedTags);
        return shopRepository.save(s);
    }
    public Optional<Shop> getById(Long id) {

        return shopRepository.findById(id);
    }

    public List<Shop> getApprovedShops() {

        return shopRepository.findByApprovedTrue();
    }
}
