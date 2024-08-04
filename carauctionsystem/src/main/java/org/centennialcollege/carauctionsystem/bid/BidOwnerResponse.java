package org.centennialcollege.carauctionsystem.bid;

import lombok.Data;
import org.centennialcollege.carauctionsystem.auth.Users;

@Data
public class BidOwnerResponse {
    private String name;
    private String contact;

    public BidOwnerResponse(Users user) {
        this.name = user.getFirstName() + " " + user.getLastName();
        this.contact = user.getEmail();
    }
}
