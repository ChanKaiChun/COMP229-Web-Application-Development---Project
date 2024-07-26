package org.centennialcollege.carauctionsystem.auction;

import org.centennialcollege.carauctionsystem.auth.Users;
import org.centennialcollege.carauctionsystem.auth.UsersRepository;
import org.centennialcollege.carauctionsystem.bid.BidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class AuctionService {
    @Autowired
    private AuctionRepository auctionRepository;
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private BidRepository bidRepository;

    public List<Auction> getAuctions() {
        return auctionRepository.findAll();
    }

    public List<Auction> getFeatureAuctions(){
        return auctionRepository.findAllByStartTimeAfter(Instant.now());
    }

    public List<Auction> getLiveAuctions(){
        return auctionRepository.findAllByStartTimeBeforeAndEndTimeAfter(Instant.now(), Instant.now());
    }

    public List<Auction> getPassedAuctions(){
        List<Auction> auctions = auctionRepository.findAllByEndTimeBefore(Instant.now());
        auctions.forEach(auction -> {
            
        });
        return auctions;
    }

    public Auction getAuction(String id) {
        return auctionRepository.findById(id).orElseThrow(() -> new RuntimeException("Auction not found"));
    }

    public void createAuction(Auction auction, String email) {
        Users user = usersRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Current user is not exist"));

        auction.setCurrentPrice(auction.getStartPrice());
        auction.setCreatedDate(Instant.now());
        auction.setOwnerId(user.getId());
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
