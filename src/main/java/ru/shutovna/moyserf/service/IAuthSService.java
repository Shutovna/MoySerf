package ru.shutovna.moyserf.service;

import ru.shutovna.moyserf.model.PasswordResetToken;
import ru.shutovna.moyserf.model.User;
import ru.shutovna.moyserf.model.VerificationToken;
import ru.shutovna.moyserf.payload.request.SignUpRequest;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;

public interface IAuthSService {
    enum VerificationTokenStatus {
        TOKEN_INVALID("invalidToken"),
        TOKEN_EXPIRED("expired"),
        TOKEN_VALID("valid");

        private String name;

        VerificationTokenStatus(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }
    }

    User getUser(String verificationToken);

    User registerNewUserAccount(SignUpRequest signUpRequest);

    void createVerificationTokenForUser(User user, String token);

    VerificationToken getVerificationToken(String VerificationToken);

    VerificationToken generateNewVerificationToken(String token);

    void verifyUserRegistration(String verificationToken);

    void createPasswordResetTokenForUser(User user, String token);

    PasswordResetToken getPasswordResetToken(String token);

    Optional<User> getUserByPasswordResetToken(String token);

    Optional<PasswordResetToken> getPasswordResetTokenByUser(User user);

    public Consumer<? super PasswordResetToken> deletePasswordResetToken(String token);

    void changeUserPassword(User user, String password);

    boolean checkIfValidOldPassword(User user, String password);

    VerificationTokenStatus validateVerificationToken(String token);

    String generateQRUrl(User user) throws UnsupportedEncodingException;

    User updateUser2FA(boolean use2FA);

    List<String> getUsersFromSessionRegistry();

}
