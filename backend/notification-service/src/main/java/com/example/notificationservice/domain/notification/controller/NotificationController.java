package com.example.notificationservice.domain.notification.controller;

import com.example.notificationservice.domain.notification.application.NotificationDeleteUseCase;
import com.example.notificationservice.domain.notification.application.NotificationReadUseCase;
import com.example.notificationservice.domain.notification.application.NotificationSearchUseCase;
import com.example.notificationservice.global.config.webmvc.AuthMember;
import com.example.notificationservice.global.config.webmvc.JwtLoginMember;
import com.example.notificationservice.global.dto.HttpResponse;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notification")
public class NotificationController {

    private final NotificationSearchUseCase notificationSearchUseCase;
    private final NotificationDeleteUseCase notificationDeleteUseCase;
    private final NotificationReadUseCase notificationReadUseCase;

    @GetMapping("/check")
    public ResponseEntity<?> checkNotificationPresent(@JwtLoginMember AuthMember authMember) {
        return HttpResponse.okWithData(HttpStatus.OK, "조회 성공",
                notificationSearchUseCase.checkNotificationPresent(authMember));
    }

    @GetMapping
    public ResponseEntity<?> searchNotificationBox(@JwtLoginMember AuthMember authMember) {
        return HttpResponse.okWithData(HttpStatus.OK, "조회 성공",
                notificationSearchUseCase.searchNotificationBox(authMember));
    }

    @DeleteMapping
    public ResponseEntity<?> deleteNotificationBox(@JwtLoginMember AuthMember authMember) {
        notificationDeleteUseCase.deleteNotificationBox(authMember);
        return HttpResponse.ok(HttpStatus.OK, "삭제 성공");
    }

    @PatchMapping("/{notificationId}")
    public ResponseEntity<?> readNotification(@PathVariable ObjectId notificationId,
            @JwtLoginMember AuthMember authMember) {
        notificationReadUseCase.readNotification(notificationId, authMember);
        return HttpResponse.ok(HttpStatus.OK, "읽음 완료");
    }

    @GetMapping("/tree/{treeId}")
    public ResponseEntity<?> searchTreeNotification(@PathVariable UUID treeId,
            @JwtLoginMember AuthMember authMember) {
        return HttpResponse.okWithData(HttpStatus.OK, "조회 완료",
                notificationSearchUseCase.searchTreeNotification(treeId, authMember));
    }

}
