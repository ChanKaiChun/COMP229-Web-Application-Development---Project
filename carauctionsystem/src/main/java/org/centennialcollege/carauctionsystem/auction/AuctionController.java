package org.centennialcollege.carauctionsystem.auction;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auction")
public class AuctionController {

    @Autowired
    private AuctionService auctionService;

    @GetMapping
    public ResponseEntity<List<Auction>> getAuctions() {
        return ResponseEntity.ok().body(auctionService.getAuctions());
    }

    @GetMapping("/live")
    public ResponseEntity<List<Auction>> getLiveAuctions() {
        return ResponseEntity.ok().body(auctionService.getLiveAuctions());
    }

    @GetMapping("/featured")
    public ResponseEntity<List<Auction>> getFeatureAuctions() {
        return ResponseEntity.ok().body(auctionService.getFeatureAuctions());
    }

    @GetMapping("/passed")
    public ResponseEntity<List<Auction>> getPassedAuctions() {
        return ResponseEntity.ok().body(auctionService.getPassedAuctions());
    }

    @GetMapping("/{auctionId}")
    public ResponseEntity<Auction> getAuction(@PathVariable String auctionId) {
        return ResponseEntity.ok().body(auctionService.getAuction(auctionId));
    }

    @PostMapping
    public ResponseEntity<?> createAuction(@Valid @RequestBody AuctionCreateRequest model) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Auction auction = new Auction(model);
        auctionService.createAuction(auction, user.getUsername());
        return ResponseEntity.accepted().build();
    }

    @PutMapping
    public ResponseEntity<?> updateAuction(@Valid @RequestBody Auction auction) {
        auctionService.updateAuction(auction);
        return ResponseEntity.accepted().build();
    }

    @GetMapping("/owner/{auctionId}")
    public ResponseEntity<AuctionOwnerResponse> getAuctionOwner(@PathVariable String auctionId) {
        return ResponseEntity.ok().body(auctionService.getAuctionUser(auctionId));
    }

    @GetMapping("/my-auction")
    public ResponseEntity<List<Auction>> getMyAuction(@RequestParam(required=false) String type) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
       return ResponseEntity.ok().body(auctionService.getAuctionsByUser(type, user.getUsername()));
    }
}
