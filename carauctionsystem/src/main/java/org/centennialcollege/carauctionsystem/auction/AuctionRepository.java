package org.centennialcollege.carauctionsystem.auction;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface AuctionRepository extends MongoRepository<Auction, Integer> {
    Auction findByCarModel(String carModel);
}
