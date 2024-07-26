package org.centennialcollege.carauctionsystem.bid;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface BidRepository extends MongoRepository<Bid, String> {
    public Bid findFirstByAuctionIdOrderByBidTimeDesc(String auctionId);
}
