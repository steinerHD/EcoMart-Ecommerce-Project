package com.ecomart.backend;

import com.ecomart.backend.config.JwtConfig;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JwtConfigTest {

    @Test
    void jwtConfig_deberiaInstanciarse() {

        JwtConfig config = new JwtConfig();

        assertNotNull(config);
    }
}