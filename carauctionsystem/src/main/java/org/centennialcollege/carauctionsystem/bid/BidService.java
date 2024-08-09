package org.centennialcollege.carauctionsystem.bid;

import org.centennialcollege.carauctionsystem.auction.Auction;
import org.centennialcollege.carauctionsystem.auction.AuctionRepository;
import org.centennialcollege.carauctionsystem.auth.Users;
import org.centennialcollege.carauctionsystem.auth.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
public class BidService {
    @Autowired
    private BidRepository bidRepository;
    @Autowired
    private AuctionRepository auctionRepository;
    @Autowired
    private UsersRepository usersRepository;

    public void bidAuction(BidRequest request, String email) throws Exception {
        Users user = usersRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Current user is not exist"));

        Optional<Auction> auction = auctionRepository.findById(request.getAuctionId());
        if (auction.isPresent()) {
            Double minPrice = auction.get().getStartPrice();
            Bid lastBid = bidRepository.findFirstByAuctionIdOrderByBidTimeDesc(auction.get().getId());
            if(lastBid != null) {
                minPrice = lastBid.getAmount();
            }
            if(minPrice < request.getAmount()) {
                Bid bid = new Bid(request);
                bid.setBidTime(Instant.now());
                bid.setBidderId(user.getId());
                bidRepository.save(bid);
                auction.get().setReservePrice(bid.getAmount());
            } else {
                throw new Exception("Bid is too low");
            }
        } else {
            throw new Exception("Auction " + request.getAuctionId() + " is not exist");
        }
    }

    public void findLatestBidByAuction(String auctionId) {
        System.out.println(bidRepository.findFirstByAuctionIdOrderByBidTimeDesc("6695faa852b0be6663901a38"));
    }

    public void findMyBid(String email) throws Exception {

    }

    public void findMyBidInAuction(String auction, String email) throws Exception {

    }
}
