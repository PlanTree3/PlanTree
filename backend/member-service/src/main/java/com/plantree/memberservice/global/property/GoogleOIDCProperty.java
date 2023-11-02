package com.plantree.memberservice.global.property;

import com.plantree.memberservice.domain.auth.application.oidc.OIDCProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties("google")
public class GoogleOIDCProperty {

    private String iss;
    private String aud;
    private String adminKey;

    public OIDCProperty toOIDCProperty() {
        return new OIDCProperty(iss, aud);
    }
}
