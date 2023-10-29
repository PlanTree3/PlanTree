package com.plantree.memberservice.domain.member.application.repository;

import com.plantree.memberservice.domain.member.domain.Member;
import com.plantree.memberservice.domain.member.domain.OauthProvider;
import java.util.Optional;
import java.util.UUID;

public interface MemberRepository {

    Optional<Member> findByOauthProviderAndOauthId(OauthProvider oauthProvider, String oauthId);

    boolean existsByOauthProviderAndOauthId(OauthProvider oauthProvider, String oauthId);

    Member save(Member member);

    Optional<Member> findById(UUID memberId);
}
