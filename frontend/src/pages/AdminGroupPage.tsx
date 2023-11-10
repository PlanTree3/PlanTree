import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
import './GroupPage.css'
import Button from '@/components/Button/Button'
import Modal from '@/components/Button/Modal'
import { groupCreate, teacherGroupList } from '@/apis'
// import { GroupRequest } from '@/types/GroupAdminType'

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

  //그룹생성
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

  //여기부터는 페이지 넘기면서 조회하는 것 임시
  const GroupsPerPage = 5
  // const dummyData = {
  //   statusCode: 200,
  //   message: '수락 성공',
  //   data: {
  //     groups: [
  //       { groupName: '그룹1', createdAt: '2023-01-15', studentCount: 10 },
  //       { groupName: '그룹2', createdAt: '2023-02-20', studentCount: 15 },
  //       { groupName: '그룹3', createdAt: '2023-03-10', studentCount: 8 },
  //       { groupName: '그룹4', createdAt: '2023-04-05', studentCount: 12 },
  //       { groupName: '그룹5', createdAt: '2023-05-18', studentCount: 20 },
  //       { groupName: '그룹6', createdAt: '2023-06-22', studentCount: 7 },
  //       { groupName: '그룹7', createdAt: '2023-07-09', studentCount: 13 },
  //       { groupName: '그룹8', createdAt: '2023-08-12', studentCount: 18 },
  //     ],
  //   },
  // }

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

  return (
    <div>
      <hr />
      <h2>내 그룹 확인하기</h2>
      <div className="studentListBox">
        <h3>번호 그룹명 시작일 인원</h3>
        {currentGroups?.map((group: any, index: number) => (
          <div>
            {/* eslint-disable-next-line react/no-array-index-key */}
            <div key={index} className="groupItem">
              {/* <Link> */}
              <p className="groupInfo">{index + 1 + (currentPage - 1) * 5} </p>
              <p className="groupInfo">{group.groupName} </p>
              <p className="groupInfo">
                {group.createdAt[0]}-{group.createdAt[1]}-{group.createdAt[2]}{' '}
              </p>
              <p className="groupInfo">{group.studentCount} </p>
              {/* </Link> */}
            </div>
            <hr style={{ background: 'black', height: 1, border: 0 }} />
          </div>
        ))}
      </div>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => changePage(number)}>
            {number}
          </button>
        ))}
      </div>
      <Button className="primary" onClick={openModal} label="그룹 생성하기" />
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

export default AdminGroupPage
