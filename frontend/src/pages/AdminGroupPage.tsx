import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './GroupPage.scss'
import Button from '@/components/Button/Button'
import Modal from '@/components/Button/Modal'
import { groupCreate, teacherGroupList } from '@/apis'
import { LoginCheck } from '@/components'

const AdminGroupPage: React.FC = () => {
  //useState들
  const [currentPage, setCurrentPage] = useState(1)
  const [inputGroupName, setInputGroupName] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [groupData, setGroupData] = useState<any>(null)

  // 모달 관련
  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }
  // 모달 내 인풋창
  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      // handleCreateGroup();
    }
  }

  // 그룹생성
  // if (!inputGroupName) {
  //   alert('그룹 이름을 지정해주세요')
  // } else {
  const data = { groupName: inputGroupName }
  const handleCreateGroup = async () => {
    console.log('여기까진??')
    try {
      console.log('이것도 되지?')
      const response = await groupCreate(data)
      console.log('Response:', response)
    } catch (error) {
      console.error('Error:', error)
    }
    setIsOpen(false)
  }

  // 그룹 리스트 조회
  const handleGetGroupList = async () => {
    console.log('1')
    try {
      console.log('2')
      const response = await teacherGroupList()
      console.log('Response:', response)
      setGroupData(response.data)
      console.log(response.data.data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    handleGetGroupList()
  }, [])

  //여기부터는 페이지 넘기면서 조회하는 것
  const GroupsPerPage = 5

  const indexOfLastGroup = currentPage * GroupsPerPage
  const indexOfFirstGroup = indexOfLastGroup - GroupsPerPage
  const currentGroups = groupData?.data.groups?.slice(
    indexOfFirstGroup,
    indexOfLastGroup,
  )

  const totalPages = groupData?.data.groups
    ? Math.ceil(groupData.data.groups.length / GroupsPerPage)
    : 0

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i += 1) {
    pageNumbers.push(i)
  }

  const changePage = (page: number) => {
    setCurrentPage(page)
  }

  // const navigate = useNavigate();

  // const handleClick = () => {
  //   const groupName = groupData.groupName
  //   navigate({
  //     pathname: `/adminGroupDetail/${groupData.groupId}`,
  //     state: { groupName: groupName },
  //   });
  // };

  return (
    <div className="admin-group-page-container">
      <div className="admin-group-page-title">
        <div className="admin-group-page-title-text">내 그룹 확인하기</div>
        <Button
          className="normal primary"
          onClick={openModal}
          label="그룹 생성하기"
        />
      </div>
      <div className="admin-group-page-list-box">
        {currentGroups?.length !== 0 && (
          <>
            <div className="admin-group-page-list-title">
              <div>번호</div>
              <div>제목</div>
              <div>생성일</div>
              <div>인원</div>
            </div>
            <hr />
          </>
        )}
        {currentGroups?.map((group: any, index: number) => (
          <Link
            to={`/adminGroupDetail/${group.groupId}`}
            state={{ groupName: group.groupName }}
          >
            <div key={(group.groupId, index)} className="admin-group-item">
              <p className="groupInfo">{index + 1 + (currentPage - 1) * 5} </p>
              <p className="groupInfo">{group.groupName} </p>
              <p className="groupInfo">
                {group.createdAt[0]}-{group.createdAt[1]}-{group.createdAt[2]}{' '}
              </p>
              <p className="groupInfo">{group.studentCount} </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="admin-group-pagination">
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => changePage(number)}>
            {number}
          </button>
        ))}
      </div>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        content={
          <div>
            <div>그룹명을 입력해주세요</div>
            <input
              placeholder="ex. 2023 3학년 2반"
              maxLength={50}
              onChange={(e) => setInputGroupName(e.target.value)}
              onKeyDown={handleEnterKeyPress}
            />
            <Button
              className="primary"
              label="생성하기"
              onClick={handleCreateGroup}
            />
            <Button
              className="primary ml-4"
              label="취소"
              onClick={closeModal}
            />
          </div>
        }
      />
    </div>
  )
}

export default LoginCheck(AdminGroupPage)
