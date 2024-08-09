package ru.shutovna.moyserf.task;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.shutovna.moyserf.persistence.dao.PasswordResetTokenRepository;
import ru.shutovna.moyserf.persistence.dao.VerificationTokenRepository;

@Service
@Transactional
@Slf4j
public class EmailSendTask {

    public static final long SEND_RATE_MS = 30000;
    @Autowired
    VerificationTokenRepository tokenRepository;

    @Autowired
    PasswordResetTokenRepository passwordTokenRepository;

    @Scheduled(fixedRate = SEND_RATE_MS)
    public void sendEmails() {
        log.debug("Sending emails by schedule at rate " + SEND_RATE_MS + " ms");

    }
}
