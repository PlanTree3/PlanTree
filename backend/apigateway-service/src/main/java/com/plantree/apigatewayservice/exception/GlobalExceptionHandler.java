package com.plantree.apigatewayservice.exception;

import java.nio.charset.StandardCharsets;
import org.springframework.boot.web.reactive.error.ErrorWebExceptionHandler;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
public class GlobalExceptionHandler implements ErrorWebExceptionHandler {

    @Override
    public Mono<Void> handle(ServerWebExchange exchange, Throwable ex) {
        ServerHttpResponse response = exchange.getResponse();
        if (ex.getClass() == AuthenticationFailException.class) {
            response.setStatusCode(HttpStatus.BAD_REQUEST);
        } else if (ex.getClass() == TokenExpiredException.class) {
            response.setStatusCode((HttpStatus.UNAUTHORIZED));
        }
        byte[] bytes = ex.getMessage()
                         .getBytes(StandardCharsets.UTF_8);
        DataBuffer buffer = exchange.getResponse()
                                    .bufferFactory()
                                    .wrap(bytes);
        return response.writeWith(Flux.just(buffer));
    }


}
