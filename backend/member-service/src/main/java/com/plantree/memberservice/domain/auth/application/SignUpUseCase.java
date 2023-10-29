package com.plantree.memberservice.domain.auth.application;

import com.plantree.memberservice.domain.auth.application.jwt.JwtProvider;
import com.plantree.memberservice.domain.auth.application.oidc.IDTokenValidatorHandler;
import com.plantree.memberservice.domain.auth.application.oidc.OIDCMember;
import com.plantree.memberservice.domain.auth.dto.SignUpResponseDto;
import com.plantree.memberservice.domain.auth.dto.request.SignUpRequestDto;
import com.plantree.memberservice.domain.member.application.repository.MemberRepository;
import com.plantree.memberservice.domain.member.application.repository.ParentRepository;
import com.plantree.memberservice.domain.member.application.repository.StudentRepository;
import com.plantree.memberservice.domain.member.application.repository.TeacherRepository;
import com.plantree.memberservice.domain.member.domain.Member;
import com.plantree.memberservice.domain.member.domain.Parent;
import com.plantree.memberservice.domain.member.domain.Student;
import com.plantree.memberservice.domain.member.domain.Teacher;
import com.plantree.memberservice.global.exception.AlreadyExistedMemberException;
import com.plantree.memberservice.global.exception.UnsupportedRoleException;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SignUpUseCase {

    private final IDTokenValidatorHandler idTokenValidatorHandler;
    private final MemberRepository memberRepository;
    private final StudentRepository studentRepository;
    private final ParentRepository parentRepository;
    private final TeacherRepository teacherRepository;
    private final JwtProvider jwtProvider;
    private final CookieHelper cookieHelper;


    @Transactional
    public SignUpResponseDto signUp(SignUpRequestDto signUpRequestDto,
            HttpServletResponse httpServletResponse) {
        OIDCMember oidcMember = idTokenValidatorHandler.getOidcMemberByProviderAndIDToken(
                signUpRequestDto.getOauthProvider(), signUpRequestDto.getIdToken());

        checkMemberExistsOrThrow(oidcMember);
        Member member = createMember(oidcMember, signUpRequestDto);
        saveMemberByRole(member);

        String accessToken = jwtProvider.generateAccessToken(member);
        String refreshToken = jwtProvider.generateRefreshToken();
        member.setRefreshToken(refreshToken);

        cookieHelper.setAccessTokenInCookie(httpServletResponse, accessToken);
        cookieHelper.setRefreshTokenInCookie(httpServletResponse, refreshToken);
        return new SignUpResponseDto(member.getId());
    }

    private void saveMemberByRole(Member member) {
        switch (member.getRole()) {
            case STUDENT:
                Student student = new Student(member);
                studentRepository.save(student);
                break;
            case PARENT:
                Parent parent = new Parent(member);
                parentRepository.save(parent);
                break;
            case TEACHER:
                Teacher teacher = new Teacher(member);
                teacherRepository.save(teacher);
                break;
            default:
                throw new UnsupportedRoleException();
        }
    }

    private Member createMember(OIDCMember oidcMember, SignUpRequestDto signUpRequestDto) {
        return Member.builder()
                     .oauthProvider(oidcMember.getOauthProvider())
                     .oauthId(oidcMember.getOauthId())
                     .name(signUpRequestDto.getName())
                     .profileImageUrl(signUpRequestDto.getProfileImageUrl())
                     .birthDate(signUpRequestDto.getBirthDate())
                     .email(oidcMember.getEmail())
                     .role(signUpRequestDto.getRole())
                     .build();
    }

    private void checkMemberExistsOrThrow(OIDCMember oidcMember) {
        if (memberRepository.existsByOauthProviderAndOauthId(oidcMember.getOauthProvider(),
                oidcMember.getOauthId())) {
            throw new AlreadyExistedMemberException("이미 존재하는 회원입니다.");
        }
    }

}
