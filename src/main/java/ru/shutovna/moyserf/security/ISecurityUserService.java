package ru.shutovna.moyserf.security;

public interface ISecurityUserService {

    String validatePasswordResetToken(String token);

}
