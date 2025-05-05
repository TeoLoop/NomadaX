package com.nomadax.dto;

import com.nomadax.entity.Role;

public class UserDTO {
    private String name;
    private String lastName;
    private Role role;
    private String image;

    public UserDTO(String name, String lastName, Role role, String image) {
        this.name = name;
        this.lastName = lastName;
        this.role = role;
        this.image = image;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
