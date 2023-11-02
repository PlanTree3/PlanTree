package com.plantree.memberservice.domain.member.infra;

import com.plantree.memberservice.domain.member.application.repository.MemberRepository;
import com.plantree.memberservice.domain.member.domain.Member;
import com.plantree.memberservice.domain.member.domain.OauthProvider;
import com.plantree.memberservice.domain.member.infra.jpa.MemberJpaRepository;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepository {

    private final MemberJpaRepository memberJpaRepository;

    @Override
    public Optional<Member> findByOauthProviderAndOauthId(OauthProvider oauthProvider,
            String oauthId) {
        return memberJpaRepository.findByOauthProviderAndOauthId(oauthProvider, oauthId);
    }

    @Override
    public boolean existsByOauthProviderAndOauthId(OauthProvider oauthProvider, String oauthId) {
        return memberJpaRepository.existsByOauthProviderAndOauthId(oauthProvider, oauthId);
    }

    @Override
    public Member save(Member member) {
        return memberJpaRepository.save(member);
    }

    @Override
    public Optional<Member> findById(UUID memberId) {
        return memberJpaRepository.findById(memberId);
    }
}
