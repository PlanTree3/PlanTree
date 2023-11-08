package com.example.notificationservice.global.infra.fcm;

import com.example.notificationservice.global.property.FCMProperty;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import java.io.InputStream;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FCMInitializer {

    private final FCMProperty fcmProperty;

    @PostConstruct
    public void initialize() {
        ClassPathResource resource = new ClassPathResource(fcmProperty.getCredential());

        try (InputStream stream = resource.getInputStream()) {
            FirebaseOptions options = FirebaseOptions.builder()
                                                     .setCredentials(
                                                             GoogleCredentials.fromStream(stream))
                                                     .build();
            if (FirebaseApp.getApps()
                           .isEmpty()) {
                FirebaseApp.initializeApp(options);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
