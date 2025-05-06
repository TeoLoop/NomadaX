package com.nomadax.entity;

public enum Role {
    USER,
    ADMIN;

//    RETORNA EL NOMBRE DEL ROL CON EL PREFIJO REQUERIDO POR SRPING SECURITY
    public String getFullRoleName(){
        return "ROLE_" + this.name();
    }


}
