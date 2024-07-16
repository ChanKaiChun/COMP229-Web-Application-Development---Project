package org.centennialcollege.carauctionsystem.auction;

import lombok.Data;

import java.time.Instant;

@Data
public class AuctionCreateModel {
    private String carModel;
    private String carMake;
    private String carYear;
    private String carColor;
    private Integer carMileage;
    private String carVin;
    private String description;
    private Double startPrice;
    private Double reservePrice;
    private Instant startTime;
    private Instant endTime;
}
