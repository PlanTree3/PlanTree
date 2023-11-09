package com.plantree.memberservice.domain.member.infra;

import com.plantree.memberservice.domain.member.application.repository.MemberRepository;
import com.plantree.memberservice.domain.member.domain.Member;
import com.plantree.memberservice.domain.member.domain.OauthProvider;
import com.plantree.memberservice.domain.member.infra.jpa.MemberJpaRepository;
import com.plantree.memberservice.domain.member.infra.query.MemberQueryRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepository {

    private final MemberJpaRepository memberJpaRepository;
    private final MemberQueryRepository memberQueryRepository;

    @Override
    public Optional<Member> findByOauthProviderAndOauthId(OauthProvider oauthProvider,
            String oauthId) {
        return Optional.ofNullable(
                memberQueryRepository.findByOauthProviderAndOauthId(oauthProvider, oauthId));
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
        return Optional.ofNullable(memberQueryRepository.findByIdWithRoles(memberId));
    }

    @Override
    public Optional<Member> findByIdWithGroup(UUID memberId) {
        return Optional.ofNullable(memberQueryRepository.findByIdWithGroup(memberId));
    }

    @Override
    public Optional<Member> findByIdWithGroupTeacher(UUID studentId) {
        return Optional.ofNullable(memberQueryRepository.findByIdWithGroupTeacher(studentId));
    }

    @Override
    public Optional<Member> findByIdWithNestParent(UUID studentId) {
        return Optional.ofNullable(memberQueryRepository.findByIdWithNestParent(studentId));
    }

    @Override
    public List<Member> findByIdIn(List<UUID> memberIds) {
        return memberQueryRepository.findByIdIn(memberIds);
    }
}
