package com.plantree.memberservice.domain.member.application.repository;

import com.plantree.memberservice.domain.member.domain.Member;
import com.plantree.memberservice.domain.member.domain.OauthProvider;
import java.util.Optional;

public interface MemberRepository {

    Optional<Member> findByOauthProviderAndOauthId(OauthProvider oauthProvider, String oauthId);

    boolean existsByOauthProviderAndOauthId(OauthProvider oauthProvider, String oauthId);

    Member save(Member member);
}
