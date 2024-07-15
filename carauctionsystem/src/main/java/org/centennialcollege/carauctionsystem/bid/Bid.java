package org.centennialcollege.carauctionsystem.bid;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Document
public class Bid {

    @Id
    private String id;
    private String auctionId;
    private String bidderId;
    private Double amount;
    private Instant bidTime;
}
