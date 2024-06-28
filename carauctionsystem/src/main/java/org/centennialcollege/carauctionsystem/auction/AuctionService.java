package org.centennialcollege.carauctionsystem.auction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class AuctionService {
    @Autowired
    private AuctionRepository auctionRepository;

    public List<Auction> getAuctions() {
        return auctionRepository.findAll();
    }

    public void createAuction(Auction auction) {
        auctionRepository.save(auction);
    }

    public void updateAuction(Auction auction) {
        Auction auctionData = auctionRepository.findById(auction.getId()).orElseThrow(()->new RuntimeException("Auction not found"));
        auctionData.setCarModel(auction.getCarModel());
        auctionData.setCarMake(auction.getCarMake());
        auctionData.setCarYear(auction.getCarYear());
        auctionData.setCarColor(auction.getCarColor());
        auctionData.setCarMileage(auction.getCarMileage());
        auctionData.setCarVin(auction.getCarVin());
        auctionData.setDescription(auction.getDescription());
        auctionData.setStartPrice(auction.getStartPrice());
        auctionData.setReservePrice(auction.getReservePrice());
        auctionData.setCurrentPrice(auction.getCurrentPrice());
        auctionData.setStartTime(auction.getStartTime());
        auctionData.setEndTime(auction.getEndTime());
        auctionData.setWinnerId(auction.getWinnerId());
        auctionRepository.save(auctionData);
    }
}
