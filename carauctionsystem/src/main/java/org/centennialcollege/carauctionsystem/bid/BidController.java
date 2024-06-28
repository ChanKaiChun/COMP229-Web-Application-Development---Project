package org.centennialcollege.carauctionsystem.bid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/bid")
public class BidController {

    @GetMapping("/auction/{auctionId}")
    public ResponseEntity<List<Bid>> getAllBidsByAuction(@PathVariable Integer auctionId) {
        return ResponseEntity.ok().body(new ArrayList<>());
    }

    @GetMapping("/me")
    public ResponseEntity<List<Bid>> getAllBidsByMyself() {
        return ResponseEntity.ok().body(new ArrayList<>());
    }

    @PostMapping
    public ResponseEntity<?> bidAuction(@RequestBody Bid bid) {
        return ResponseEntity.accepted().build();
    }
}
