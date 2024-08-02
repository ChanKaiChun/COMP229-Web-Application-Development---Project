package org.centennialcollege.carauctionsystem.bid;

import org.centennialcollege.carauctionsystem.auth.Users;

public class BidOwnerResponse {
    private String name;
    private String contact;

    public BidOwnerResponse(Users user) {
        this.name = user.getFirstName() + " " + user.getLastName();
        this.contact = user.getEmail();
    }
}
