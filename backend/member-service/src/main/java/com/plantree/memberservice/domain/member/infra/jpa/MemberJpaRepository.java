package com.plantree.memberservice.domain.member.infra.jpa;

import com.plantree.memberservice.domain.member.domain.Member;
import com.plantree.memberservice.domain.member.domain.OauthProvider;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberJpaRepository extends JpaRepository<Member, String> {

    Optional<Member> findByOauthProviderAndOauthId(OauthProvider oauthProvider, String oauthId);

    boolean existsByOauthProviderAndOauthId(OauthProvider oauthProvider, String oauthId);

}
