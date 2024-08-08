package org.centennialcollege.carauctionsystem.auction;

import org.centennialcollege.carauctionsystem.auth.Users;
import org.centennialcollege.carauctionsystem.auth.UsersRepository;
import org.centennialcollege.carauctionsystem.bid.Bid;
import org.centennialcollege.carauctionsystem.bid.BidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
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
        return auctions;
    }

    public AuctionDetailResponse getAuction(String id) {
        Auction auction = auctionRepository.findById(id).orElseThrow(() -> new RuntimeException("Auction not found"));
        Users owner = usersRepository.findById(auction.getOwnerId()).orElseThrow(() -> new RuntimeException("User not found"));
        Bid firstBids = bidRepository.findFirstByAuctionIdOrderByBidTimeDesc(auction.getId());
        Users bidder = null;
        if(firstBids != null){
            bidder = usersRepository.findById(firstBids.getBidderId()).orElseThrow(() -> new RuntimeException("User not found"));
        }
        return new AuctionDetailResponse(auction, owner, firstBids, bidder);
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

    public AuctionOwnerResponse getAuctionUser(String id) {
        Auction auction = auctionRepository.findById(id).orElseThrow(()->new RuntimeException("Auction not found"));
        Users auctionOwner = usersRepository.findByEmail(auction.getOwnerId()).orElseThrow(()->new RuntimeException("User not found"));
        return new AuctionOwnerResponse(auctionOwner);
    }

    public List<Auction> getAuctionsByUser(String type, String email) {
        Users user = usersRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Current user is not exist"));
        List<Auction> auctions = new ArrayList<>();
        if(type == null){
            type = "";
        }
        switch (type) {
            case "featured":
                auctions.addAll(auctionRepository.findAllByOwnerIdAndStartTimeAfter(user.getId(), Instant.now()));
                break;
            case "live":
                auctions.addAll(auctionRepository.findAllByOwnerIdAndStartTimeBeforeAndEndTimeAfter(user.getId(), Instant.now(), Instant.now()));
                break;
            case "passed":
                auctions.addAll(auctionRepository.findAllByOwnerIdAndEndTimeBefore(user.getId(), Instant.now()));
                break;
            default:
                auctions.addAll(auctionRepository.findAllByOwnerId(user.getId()));
                break;
        }
        System.out.println(auctions);
        return auctions;
    }

    public void deleteAuction(String id, String email) {
        Auction auction = auctionRepository.findById(id).orElseThrow(()->new RuntimeException("Auction not found"));
        Users user = usersRepository.findByEmail(email).orElseThrow(()->new RuntimeException("User not found"));
        if(user.getId().equals(auction.getOwnerId())){
            bidRepository.deleteByAuctionId(id);
            auctionRepository.delete(auction);
        } else {
            throw new RuntimeException("You are not the Owner.");
        }
    }
}
