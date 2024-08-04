package org.centennialcollege.carauctionsystem.bid;

import lombok.Data;
import org.centennialcollege.carauctionsystem.auth.Users;

import java.time.Instant;

@Data
public class BidDetailResponse {
    private String id;
    private String auctionId;
    private String bidderId;
    private Double amount;
    private Instant bidTime;
    private BidOwnerResponse bidder;

    public BidDetailResponse(Bid bid, Users owner){
        System.out.println("bid: " + bid);
        this.id = bid.getId();
        this.auctionId = bid.getAuctionId();
        this.bidderId = bid.getBidderId();
        this.amount = bid.getAmount();
        this.bidTime = bid.getBidTime();
        System.out.println("owner: " + owner);
        this.bidder = new BidOwnerResponse(owner);
    }
}
