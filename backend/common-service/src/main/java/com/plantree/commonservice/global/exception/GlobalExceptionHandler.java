package com.plantree.commonservice.global.exception;

import com.plantree.commonservice.global.responseType.HttpResponse;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<?> handleBusiness(BusinessException e) {
        return HttpResponse.fail(HttpStatus.valueOf(e.getStatusCode()), e.getMessage());
    }

    @ExceptionHandler(BindException.class)
    public ResponseEntity<?> handleBindException(BindException e) {
        String errorMessage = getBindingResultErrorMessage(e.getBindingResult());
        return HttpResponse.fail(HttpStatus.BAD_REQUEST, errorMessage);
    }


    private String getBindingResultErrorMessage(BindingResult bindingResult) {
        ObjectError objectError = bindingResult.getAllErrors()
                                               .stream()
                                               .findFirst()
                                               .get();
        return objectError.getDefaultMessage();
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<?> handleConstraintViolationException(ConstraintViolationException e) {
        return HttpResponse.fail(HttpStatus.BAD_REQUEST, e.getMessage());
    }

}
