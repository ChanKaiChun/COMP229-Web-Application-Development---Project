package org.centennialcollege.carauctionsystem.auction;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@NoArgsConstructor
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
    private String ownerId;
    private Double startPrice;
    private Double reservePrice;
    private Double currentPrice;
    private Instant startTime;
    private Instant endTime;
    private String winnerId;
    private Instant createdDate;

    public Auction(AuctionCreateModel model) {
        this.carModel = model.getCarModel();
        this.carMake = model.getCarMake();
        this.carYear = model.getCarYear();
        this.carColor = model.getCarColor();
        this.carMileage = model.getCarMileage();
        this.carVin = model.getCarVin();
        this.description = model.getDescription();
        this.startPrice = model.getStartPrice();
        this.reservePrice = model.getReservePrice();
        this.startTime = model.getStartTime();
        this.endTime = model.getEndTime();
    }
}
