package org.centennialcollege.carauctionsystem.bid;

import lombok.Data;
import org.centennialcollege.carauctionsystem.auth.UserResponse;
import org.centennialcollege.carauctionsystem.auth.Users;

import java.time.Instant;

@Data
public class BidDetailResponse {
    private String id;
    private String auctionId;
    private String bidderId;
    private Double amount;
    private Instant bidTime;
    private UserResponse bidder;

    public BidDetailResponse(Bid bid, Users owner){
        this.id = bid.getId();
        this.auctionId = bid.getAuctionId();
        this.bidderId = bid.getBidderId();
        this.amount = bid.getAmount();
        this.bidTime = bid.getBidTime();
        this.bidder = new UserResponse(owner);
    }
}
