package org.centennialcollege.carauctionsystem.auction;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.Instant;
import java.util.List;

public interface AuctionRepository extends MongoRepository<Auction, String> {
    Auction findByCarModel(String carModel);

    List<Auction> findAllByStartTimeAfter(Instant startTime);
    List<Auction> findAllByStartTimeBeforeAndEndTimeAfter(Instant startTime, Instant endTime);
    List<Auction> findAllByEndTimeBefore(Instant endTime);

    List<Auction> findAllByOwnerId(String ownerId);
    List<Auction> findAllByOwnerIdAndStartTimeAfter(String ownerId, Instant startTime);
    List<Auction> findAllByOwnerIdAndStartTimeBeforeAndEndTimeAfter(String ownerId, Instant startTime, Instant endTime);
    List<Auction> findAllByOwnerIdAndEndTimeBefore(String ownerId, Instant endTime);
}
