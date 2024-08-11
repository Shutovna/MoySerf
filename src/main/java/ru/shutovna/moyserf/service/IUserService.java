package ru.shutovna.moyserf.service;
import ru.shutovna.moyserf.model.PasswordResetToken;
import ru.shutovna.moyserf.model.User;
import ru.shutovna.moyserf.model.VerificationToken;
import ru.shutovna.moyserf.payload.SignUpRequest;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;

public interface IUserService {

    public enum VerificationTokenStatus {
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

    User registerNewUserAccount(SignUpRequest signUpRequest);

    User getUser(String verificationToken);

    void saveRegisteredUser(User user);

    void deleteUser(User user);

    void createVerificationTokenForUser(User user, String token);

    VerificationToken getVerificationToken(String VerificationToken);

    VerificationToken generateNewVerificationToken(String token);

    void verifyUserRegistration(String verificationToken);

    void createPasswordResetTokenForUser(User user, String token);

    User findUserByEmail(String email);

    PasswordResetToken getPasswordResetToken(String token);

    Optional<User> getUserByPasswordResetToken(String token);

    Optional<PasswordResetToken> getPasswordResetTokenByUser(User user);

    public Consumer<? super PasswordResetToken> deletePasswordResetToken(String token);

    Optional<User> getUserByID(long id);

    void changeUserPassword(User user, String password);

    boolean checkIfValidOldPassword(User user, String password);

    VerificationTokenStatus validateVerificationToken(String token);

    String generateQRUrl(User user) throws UnsupportedEncodingException;

    User updateUser2FA(boolean use2FA);

    List<String> getUsersFromSessionRegistry();
}
