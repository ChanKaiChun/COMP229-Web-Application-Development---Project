package org.centennialcollege.carauctionsystem.auction;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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

    @GetMapping
    public ResponseEntity<Auction> getAuction(@RequestParam Integer auctionId) {
        return ResponseEntity.ok().body(auctionService.getAuction(auctionId));
    }

    @PostMapping
    public ResponseEntity<?> createAuction(@Valid @RequestBody Auction auction) {
        auctionService.createAuction(auction);
        return ResponseEntity.accepted().build();
    }

    @PostMapping
    public ResponseEntity<?> updateAuction(@Valid @RequestBody Auction auction) {
        auctionService.updateAuction(auction);
        return ResponseEntity.accepted().build();
    }

    @GetMapping("/owner/{auctionId}")
    public ResponseEntity<Auction> getAuctionOwner(@PathVariable Integer auctionId) {
        return ResponseEntity.ok().body(new Auction());
    }
}
