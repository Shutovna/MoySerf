package ru.shutovna.myserf.security;

public interface ISecurityUserService {

    String validatePasswordResetToken(String token);

}
