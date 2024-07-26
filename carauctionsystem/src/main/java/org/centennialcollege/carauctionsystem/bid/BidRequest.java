package org.centennialcollege.carauctionsystem.bid;

import lombok.Data;

@Data
public class BidRequest {
    private String auctionId;
    private Double amount;
}
