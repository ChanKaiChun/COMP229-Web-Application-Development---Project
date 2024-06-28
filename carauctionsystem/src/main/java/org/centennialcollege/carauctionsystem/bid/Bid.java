package org.centennialcollege.carauctionsystem.bid;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Document
public class Bid {

    @Id
    private Integer id;
    private Integer auctionId;
    private Integer bidderId;
    private Double amount;
    private Instant bidTime;
}
