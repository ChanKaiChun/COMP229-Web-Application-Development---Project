package org.centennialcollege.carauctionsystem.auction;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.centennialcollege.carauctionsystem.auth.UserResponse;
import org.centennialcollege.carauctionsystem.auth.Users;
import org.centennialcollege.carauctionsystem.bid.Bid;
import org.centennialcollege.carauctionsystem.bid.BidDetailResponse;

import java.time.Instant;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
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
    private Instant createdDate;
    private UserResponse owner;
    private BidDetailResponse currentBid;
    private UserResponse winner;

    public AuctionDetailResponse(Auction auction, Users owner, Bid currentBid, Users bidder, Users winner) {
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
        this.owner = new UserResponse(owner);
        if(currentBid != null){
            this.currentBid = new BidDetailResponse(currentBid, bidder);
            if(winner != null) {
                this.winner = new UserResponse(winner);
            }
        }
    }
}
