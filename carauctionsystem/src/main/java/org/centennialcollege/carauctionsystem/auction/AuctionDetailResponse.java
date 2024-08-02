package org.centennialcollege.carauctionsystem.auction;

import lombok.Data;
import org.centennialcollege.carauctionsystem.auth.Users;
import org.centennialcollege.carauctionsystem.bid.Bid;
import org.centennialcollege.carauctionsystem.bid.BidDetailResponse;

import java.time.Instant;
import java.util.List;

@Data
public class AuctionDetailResponse {
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
    private AuctionOwnerResponse owner;
    private BidDetailResponse currentBid;

    public AuctionDetailResponse(Auction auction, Users owner, Bid currentBid, Users bidder) {
        this.carModel = auction.getCarModel();
        this.carMake = auction.getCarMake();
        this.carYear = auction.getCarYear();
        this.carColor = auction.getCarColor();
        this.carMileage = auction.getCarMileage();
        this.carVin = auction.getCarVin();
        this.description = auction.getDescription();
        this.startPrice = auction.getStartPrice();
        this.reservePrice = auction.getReservePrice();
        this.startTime = auction.getStartTime();
        this.endTime = auction.getEndTime();
        this.owner = new AuctionOwnerResponse(owner);
        this.currentBid = new BidDetailResponse(currentBid, bidder);
    }
}
