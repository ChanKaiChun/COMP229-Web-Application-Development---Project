package org.centennialcollege.carauctionsystem.bid;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.centennialcollege.carauctionsystem.auction.AuctionCreateRequest;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Document
@NoArgsConstructor
public class Bid {

    @Id
    private String id;
    private String auctionId;
    private String bidderId;
    private Double amount;
    private Instant bidTime;

    public Bid(BidRequest request) {
        this.auctionId = request.getAuctionId();
        this.amount = request.getAmount();
    }
}
