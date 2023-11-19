import React, { useState, useEffect, ChangeEvent } from 'react'
import QR from 'qrcode.react'
import axios from 'axios'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import ReactModal from 'react-modal'
import pencil from '../../public/pencil.png'
import arrow from '../../public/arrow.png'
import Button from '@/components/Button/Button'
import './GroupPage.scss'
import {
  branchGroupCreate,
  groupDelete,
  groupNameUpdate,
  groupQuestCreate,
  groupStudents,
} from '@/apis'

const AdminGroupDetailPage: React.FC<any> = () => {
  const { groupId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const groupName = location.state?.groupName || ''

  const [currentPage, setCurrentPage] = useState(1)
  const [studentsData, setStudentsData] = useState<any>(null)
  const [fileList, setFileList] = useState<File[]>([])

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [questmodalIsOpen, setQuestModalIsOpen] = useState(false)
  const [QrmodalIsOpen, setQrModalIsOpen] = useState(false)
  const [pencilModalIsOpen, setPencilModalIsOpen] = useState(false)
  const [newsModalIsOpen, setNewsModalIsOpen] = useState(false)

  const [inputValue, setInputValue] = useState('')
  const [inputGroupName, setInputGroupName] = useState(groupName)
  const [inputQuestTitle, setInputQuestTitle] = useState('')
  const [inputQuestContent, setInputQuestContent] = useState('')
  const [inputNewsTitle, setInputNewsTitle] = useState('')
  const [inputNewsContent, setInputNewsContent] = useState('')

  const studentsPerPage = 5
  const endIndex = currentPage * studentsPerPage
  const startIndex = endIndex - studentsPerPage
  const currentStudents =
    studentsData?.students?.slice(startIndex, endIndex) || []

  const openModal = () => {
    setModalIsOpen(true)
  }
  const closeModal = () => {
    setModalIsOpen(false)
  }
  const openQuestModal = () => {
    setQuestModalIsOpen(true)
  }
  const closeQuestModal = () => {
    setQuestModalIsOpen(false)
    setInputQuestTitle('')
    setInputQuestContent('')
  }
  const openQrModal = () => {
    setQrModalIsOpen(true)
  }
  const closeQrModal = () => {
    setQrModalIsOpen(false)
  }
  const openPencilModal = () => {
    setPencilModalIsOpen(true)
  }
  const closePencilModal = () => {
    setPencilModalIsOpen(false)
  }
  const openNewsModal = () => {
    setNewsModalIsOpen(true)
  }
  const closeNewsModal = () => {
    setNewsModalIsOpen(false)
  }

  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setInputValue(e.target.value)
  }
  const handleGroupNameInputChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setInputGroupName(e.target.value)
  }
  const handleQuestTitleInputChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setInputQuestTitle(e.target.value)
  }
  const handleQuestContentInputChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setInputQuestContent(e.target.value)
  }
  const handleNewsTitleInputChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setInputNewsTitle(e.target.value)
  }
  const handleNewsContentInputChange = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setInputNewsContent(e.target.value)
  }
  // 파일 저장
  const onSaveFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadFiles = e.target.files

    if (uploadFiles) {
      const filesArray = Array.from(uploadFiles)
      setFileList([...fileList, ...filesArray]) // 기존 파일 목록에 새로운 파일 추가
    }
  }

  // 가지 일괄 등록
  const handleCreateBranch = async () => {
    const data = {
      name: inputValue,
    }
    // console.log('그룹아이디', groupId)
    console.log('인풋값', data)
    try {
      const response = await branchGroupCreate(groupId, data)
      console.log('Response:', response)
      // setStudentData(response.data.data)
    } catch (error) {
      console.error('Error:', error)
    }
    closeModal()
    setInputValue('')
  }

  // 그룹이름 수정
  const handleGroupName = async () => {
    const data = {
      groupName: inputGroupName,
    }
    try {
      // const groupId = '1'
      const response = await groupNameUpdate(groupId, data)
      console.log('inputGroupName 업뎃', inputGroupName)
      console.log('그룹이름 업뎃', response)
    } catch (error) {
      console.error('그룹이름 업뎃 에러', error)
    }
    setPencilModalIsOpen(false)
  }

  // 교사의 그룹 학생 리스트 조회
  const handleGetGroupDetail = async () => {
    try {
      const response = await groupStudents(groupId)
      console.log('학생 리스트 조회 응답:', response)
      console.log('dkfjdklfjdf', response.data.data)
      setStudentsData(response.data.data)
    } catch (error) {
      console.error('학생 리스트 조회 에러:', error)
    }
  }
  // 그룹 삭제
  const handleGroupDelete = async () => {
    try {
      const response = await groupDelete(groupId)
      console.log('그룹 삭제 응답:', response)
    } catch (error) {
      console.error('그룹 삭제 에러:', error)
    }
    // memo 사용 등 강제 리렌더 할 수 있는 기능 넣기
    navigate('/adminGroup')
  }

  // 그룹 퀘스트 생성
  const handleGroupQuest = async () => {
    const data = {
      title: inputQuestTitle,
      content: inputQuestContent,
      groupId,
    }
    try {
      const response = await groupQuestCreate(data)
      console.log('그룹 퀘스트 응답:', response)
    } catch (error) {
      console.error('그룹 퀘스트 에러:', error)
    }
    closeQuestModal()
  }

  // 가정통신문 파일 추가
  // const handleNoticeFile = async () => {
  //   onFileUpload()
  //   const data = {
  //     file,
  //   }
  //   try {
  //     const response = await groupNoticeCreate(groupId, data)
  //     console.log('그룹 퀘스트 응답:', response)
  //   } catch (error) {
  //     console.error('그룹 퀘스트 에러:', error)
  //   }
  // }

  // 가정통신문 생성
  const handleGroupNotice = async () => {
    const formData2 = new FormData()

    fileList.forEach((file) => {
      formData2.append('files', file)
      // console.log('파일 도는 중', file)
    })
    // console.log('폼', formData2)

    formData2.append('title', inputNewsTitle)
    formData2.append('content', inputNewsContent)

    // console.log('2차 폼데이터 파일', formData2.getAll('files'))
    // console.log('2차 폼데이터 제목', formData2.getAll('title'))

    formData2.forEach((value, key) => {
      console.log('객체 도는 중', key, formData2.getAll(key), value)
    })

    // data.append('files', [])
    // data.append('files', fileList)

    // fileList.forEach((file) => {
    //   data.append('files', file)
    // })
    // data.append('files',)

    try {
      await axios.post(
        `https://k9a302a.p.ssafy.io/api/common-service/inform/group/${groupId}`,
        formData2,
        {
          headers: { 'Content-Type': 'multipart/form-data', charset: 'utf-8' },
          withCredentials: true,
        },
      )
      // console.log('가정통신문 생성 응답:', response)
    } catch (error) {
      console.error('가정통신문 생성 에러:', error)
    }
    closeNewsModal()
    setFileList([])
  }

  useEffect(() => {
    handleGetGroupDetail()
  }, [])

  // const navi = useNavigate()

  const totalPages = studentsData
    ? Math.ceil(studentsData.students.length / studentsPerPage)
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
      <div className="admin-group-detail-container">
        <div className="admin-group-detail-title">
          {' '}
          <div className="flex items-center gap-1">
            {inputGroupName}
            <button onClick={openPencilModal}>
              <img src={pencil} alt="그룹이름수정" />
            </button>
            <div>
              <Button
                label="그룹원 추가하기"
                className="normal primary"
                onClick={openQrModal}
              />
            </div>
            <Link
              to={`/adminGroupRequest/${groupId}`}
              state={{ groupName: inputGroupName }}
            >
              <Button label="가입요청 확인하기" className="normal gray" />
            </Link>
          </div>
          <Link to="/adminGroup">
            <img
              src={arrow}
              alt=""
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            />
          </Link>
        </div>

        <div className="admin-group-detail-btn-container">
          <Button
            label="가지 일괄 등록"
            className="normal primary"
            onClick={openModal}
          />
        </div>

        <div className="admin-group-page-list-box">
          {currentStudents.length > 0 ? (
            <>
              <div className="admin-group-page-list-title2">
                <p>index</p>
                <div>이름</div>
                <div>달성도</div>
              </div>
              <hr />
              {currentStudents.map((student: any, index: number) => (
                <Link to={`/forest/student/${student.studentId}`}>
                  <div key={student.studentId} className="admin-group-item2">
                    <p className="studentFont flex-1 flex justify-center my-[2vh]">
                      {index + 1 + (currentPage - 1) * 5}
                    </p>
                    <p className="studentGroupFont font-semibold">
                      {student.studentName}
                    </p>
                    <p className="studentGroupFont">
                      {student.completedBudCount}/{student.totalBudCount}
                    </p>
                  </div>
                </Link>
              ))}
            </>
          ) : (
            <p>현재 그룹원이 없습니다.</p>
          )}
        </div>
        <div className="pagination">
          {pageNumbers.map((number, idx) => (
            <button key={idx} onClick={() => changePage(number)}>
              {number}
            </button>
          ))}
        </div>
        <div className="admin-group-detail-btn-container-bottom">
          <div className="space-x-2">
            <Button
              className="normal primary"
              label="퀘스트 생성"
              onClick={openQuestModal}
            />
            <Button
              className="normal primary"
              label="가정통신문 생성"
              onClick={openNewsModal}
            />
            <Link to={`/newsLetter/${groupId}`}>
              <Button className="normal gray" label="가정통신문 보기" />
            </Link>
          </div>
          <Button
            className="normal red"
            onClick={handleGroupDelete}
            label="그룹 삭제하기"
          />
        </div>
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            width: '100%',
            height: '100vh',
            zIndex: 10,
            top: 0,
            left: 0,
          },
          content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30%',
            height: '30%',
            border: '2px solid #000',
            borderRadius: '10px',
            overflow: 'auto',
            background: '#F5F5DC',
            boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
          },
        }}
      >
        <h1 className="flex justify-center h-[20%] items-center text-2xl bg-lime-100 rounded-[10px]">
          가지 일괄 등록
        </h1>
        <input
          className="mt-[3vh]"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="가지 이름을 입력하세요"
        />
        <br />
        <Button
          className="normal gray my-[3vh]"
          onClick={handleCreateBranch}
          label="저장"
        />
      </ReactModal>
      <ReactModal
        isOpen={pencilModalIsOpen}
        ariaHideApp={false}
        onRequestClose={closePencilModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            width: '100%',
            height: '100vh',
            zIndex: 10,
            top: 0,
            left: 0,
          },
          content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40%',
            height: '40%',
            border: '2px solid #000',
            borderRadius: '10px',
            overflow: 'auto',
            background: '#F5F5DC',
            boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
          },
        }}
      >
        <h1 className="flex justify-center h-[20%] items-center text-2xl bg-lime-100 rounded-[10px]">
          그룹 이름 변경
        </h1>
        <input
          type="text"
          value={inputGroupName}
          onChange={handleGroupNameInputChange}
          placeholder="그룹 이름을 수정하세요"
        />
        <button onClick={handleGroupName}>저장</button>
      </ReactModal>
      <ReactModal
        isOpen={QrmodalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeQrModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            width: '100%',
            height: '100vh',
            zIndex: 10,
            top: 0,
            left: 0,
          },
          content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '70%',
            border: '2px solid #000',
            borderRadius: '10px',
            overflow: 'auto',
            background: '#F5F5DC',
            boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
          },
        }}
      >
        <div className="font-semibold text-xl flex justify-center">
          QR을 찍어 그룹원을 추가해 보세요.
        </div>
        <div className="flex justify-center mt-[8vh]">
          <QR
            value={`https://k9a302a.p.ssafy.io/groupJoin/${groupId}`}
            // value={`https://http://localhost:3000/groupJoin/${groupId}`}
            size={300}
            id="qr-gen"
            includeMargin={false}
          />
        </div>
      </ReactModal>
      <ReactModal
        isOpen={questmodalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeQuestModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            width: '100%',
            height: '100vh',
            zIndex: 10,
            top: 0,
            left: 0,
          },
          content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '50%',
            border: '2px solid #000',
            borderRadius: '10px',
            overflow: 'auto',
            background: '#F5F5DC',
            boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
          },
        }}
      >
        <div className="font-semibold text-xl justify-center ">
          <div className="flex flex-row">
            <text>제목:</text>
            <input
              className="ml-[3vh]"
              type="text"
              value={inputQuestTitle}
              onChange={handleQuestTitleInputChange}
              placeholder="퀘스트 제목을 적어주세요"
            />
          </div>
          <div className="flex flex-col">
            <text>내용:</text>
            <textarea
              className="w-full h-[12rem] mt-2"
              // type="text"
              value={inputQuestContent}
              onChange={handleQuestContentInputChange}
              placeholder=" 보상을 포함한 퀘스트 내용을 적어주세요"
            />
          </div>
          <Button
            onClick={handleGroupQuest}
            label="퀘스트 생성"
            className="normal primary"
          />
        </div>
      </ReactModal>
      <ReactModal
        isOpen={newsModalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeNewsModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            width: '100%',
            height: '100vh',
            zIndex: 10,
            top: 0,
            left: 0,
          },
          content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '50%',
            border: '2px solid #000',
            borderRadius: '10px',
            overflow: 'auto',
            background: '#F5F5DC',
            boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
          },
        }}
      >
        <div>
          <div>제목: </div>
          <input
            type="text"
            value={inputNewsTitle}
            onChange={handleNewsTitleInputChange}
          />
          <div>내용: </div>
          <textarea
            className="w-full h-[8rem] rounded-lg"
            value={inputNewsContent}
            onChange={handleNewsContentInputChange}
          />
          <div>첨부파일</div>
          <input type="file" multiple onChange={onSaveFiles} />
        </div>
        <Button
          onClick={handleGroupNotice}
          label="가정통신문 생성"
          className="normal primary mt-[2vh]"
        />
      </ReactModal>
    </div>
  )
}

export default AdminGroupDetailPage
