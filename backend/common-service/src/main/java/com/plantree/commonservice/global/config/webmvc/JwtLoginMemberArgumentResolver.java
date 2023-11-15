package com.plantree.commonservice.global.config.webmvc;

import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

public class JwtLoginMemberArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        boolean isAuthMemberAnnotation =
                parameter.getParameterAnnotation(JwtLoginMember.class) != null;
        boolean isAuthUserClass = AuthMember.class.equals(parameter.getParameterType());

        return isAuthMemberAnnotation && isAuthUserClass;

    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
            NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        HttpServletRequest httpServletRequest = (HttpServletRequest) webRequest.getNativeRequest();
        String memberId = httpServletRequest.getHeader("authMember");
        System.out.println(httpServletRequest.getHeader("role"));
        Role role = Role.valueOf(httpServletRequest.getHeader("role"));

        return new AuthMember(UUID.fromString(memberId), role);
    }
}
