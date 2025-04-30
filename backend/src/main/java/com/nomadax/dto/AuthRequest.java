package com.nomadax.dto;

public class AuthRequest {

    private String email;
    private String password;

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setUsername(String username) {
        this.email = username;
    }
}
