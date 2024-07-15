package org.centennialcollege.carauctionsystem.auction;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Document
public class Auction {
    @Id
    private String id;
    private String carModel;
    private String carMake;
    private String carYear;
    private String carColor;
    private Integer carMileage;
    private String carVin;
    private String description;
    private Integer ownerId;
    private Double startPrice;
    private Double reservePrice;
    private Double currentPrice;
    private Instant startTime;
    private Instant endTime;
    private Integer winnerId;
    private Instant createdDate;
}
