package org.centennialcollege.carauctionsystem.auction;

import lombok.Data;
import org.centennialcollege.carauctionsystem.auth.Users;

@Data
public class AuctionOwnerResponse {
    private String name;
    private String contact;

    public AuctionOwnerResponse(Users user) {
        this.name = user.getFirstName() + " " + user.getLastName();
        this.contact = user.getEmail();
    }
}
