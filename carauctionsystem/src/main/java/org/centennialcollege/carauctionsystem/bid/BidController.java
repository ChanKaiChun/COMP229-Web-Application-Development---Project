package org.centennialcollege.carauctionsystem.bid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/bid")
public class BidController {

    @Autowired
    private BidService bidService;

    @GetMapping("/auction/{auctionId}")
    public ResponseEntity<Bid> getAllBidsByAuction(@PathVariable String auctionId) {
        bidService.findLatestBidByAuction(auctionId);
        return ResponseEntity.ok().body(new Bid());
    }

    @GetMapping("/my-bid")
    public ResponseEntity<List<Bid>> getAllBidsByMyself() {
        return ResponseEntity.ok().body(new ArrayList<>());
    }

    @PostMapping
    public ResponseEntity<?> bidAuction(@RequestBody BidRequest request) {
        try {
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            bidService.bidAuction(request, user.getUsername());
            return ResponseEntity.accepted().build();
        } catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
}
