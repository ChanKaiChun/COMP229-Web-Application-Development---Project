package org.centennialcollege.carauctionsystem.bid;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BidRepository extends MongoRepository<Bid, String> {
    public Bid findFirstByAuctionIdOrderByBidTimeDesc(String auctionId);
    public List<Bid> findAllByAuctionIdOrderByBidTimeDesc(String auctionId);
}
