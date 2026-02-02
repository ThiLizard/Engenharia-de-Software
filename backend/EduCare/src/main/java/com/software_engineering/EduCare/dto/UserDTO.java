package com.software_engineering.EduCare.dto;

import com.software_engineering.EduCare.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String email;
    private String name;
    private User.UserType userType;
    
    public static UserDTO fromUser(User user) {
        return new UserDTO(
            user.getId(),
            user.getEmail(),
            user.getName(),
            user.getUserType()
        );
    }
}
