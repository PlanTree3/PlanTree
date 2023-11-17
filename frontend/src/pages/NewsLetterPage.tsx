import { ChangeEvent, useEffect, useState } from 'react'
import { redirect, useParams } from 'react-router-dom'
import ReactModal from 'react-modal'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '@/components/Button/Button.css'
import Button from '@/components/Button/Button'
import {
  noticeDetail,
  groupNoticeList,
  noticeFileCreate,
  groupNoticeUpdate,
  deleteNotice,
  noticeFileDownload,
} from '@/apis/communication'
import {
  NewsLetterListG,
  ModifyNewsLetterReq,
  NewsLetter,
  // AddFile,
} from '@/types/NewsLetterType'
// import { groupNoticeList } from '@/apis'
// import { v4 as uuidv4 } from 'uuid'
import '@/pages/NewsLetter.scss'

const NewsLetterPage = () => {
  const { groupId } = useParams()
  // const MySwal = withReactContent(Swal)
  // const uuid = uuidv4()
  const [isModifying, setIsModifying] = useState<boolean>(false)
  const [inputInformId, setInputInformId] = useState<any>(0)
  const [inputTitle, setInputTitle] = useState<string>('플젝이')
  const [inputContent, setInputContent] = useState<string>('하기 싫어요')
  const [inputFile, setInputFile] = useState<
    { fileId: string; fileName: string }[]
  >([
    { fileId: '하하하하', fileName: '룰룰루루' },
    { fileId: '후후후후', fileName: '랄라라라라' },
  ])
  const [inputFileName, setInputFileName] = useState<string[]>([
    '룰룰루루',
    '랄라라라라',
  ])
  const [inputNewsLetters, setInputNewsLetters] = useState<NewsLetterListG>([
    {
      informId: 's;lakf',
      title: '플젝이',
      createdAt: new Date(),
    },
  ])
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [inputWriter, setInputWriter] = useState<string>('')
  const MySwal = withReactContent(Swal)
  // const [inputFileId, setInputFileId] = useState<string[]>([
  //   '하하하하',
  //   '후후후후',
  // ])

  // let fileNames: string[] = []

  const checkDateType = (day: Date | string) => {
    if (day instanceof Date) {
      return day
    }
    const fixDay = new Date(day)
    return fixDay
  }

  const newsListDate = (date: Date | string) => {
    const userBirthDate = checkDateType(date)

    const year = userBirthDate.getFullYear()
    const month = userBirthDate.getMonth()
    const day = userBirthDate.getDate()

    return [year, month, day].join('-')
  }

  const modifyNewsLetter = () => {
    setIsModifying(true)
  }

  const modifyTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setInputTitle(value)
  }

  const modifyContent = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setInputContent(value)
  }

  const downloadFile = async (name: string) => {
    const delFile = inputFile.filter((file) => file.fileName === name)[0]

    try {
      const fileUrl = await noticeFileDownload(inputInformId, delFile.fileId)

      window.location.href = fileUrl.data.fileUrl
    } catch (err) {
      redirect(`/newsLetterPage/:${groupId}`)
      console.log(err)
    }
  }

  const sendNewsLetter = () => {
    const data: ModifyNewsLetterReq = {
      title: inputTitle,
      content: inputContent,
    }
    groupNoticeUpdate(inputInformId, data)

    setIsModifying(false)
  }

  const closeModal = () => {
    setIsModifying(false)
    setModalIsOpen(false)
  }

  const showNews = async (informId: any) => {
    setInputInformId(informId)
    setModalIsOpen(true)

    // api 연결
    // 여기로 오면 다시 api 연결이 되는지 확인해보자!
    const news: NewsLetter = await noticeDetail(informId)

    // useState에 때려박자
    setInputTitle(news.data.title)
    setInputContent(news.data.content)
    setInputFile(news.data.files)
    const fileNames: string[] = []
    if (news.data.files?.length > 0) {
      news.data.files.map((file: any) => fileNames.push(file.fileName))
    }

    setInputFileName(fileNames)
    setInputWriter(news.data.writer)
  }

  const fileList: File[] = []

  const onSaveFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadFiles = e.target.files

    if (uploadFiles) {
      const filesArray = Array.from(uploadFiles)
      filesArray.map((file) => fileList.push(file))
    }
  }
  const fileNames: string[] = inputFileName

  const onFileUpload = async () => {
    const formData = new FormData()

    fileList.forEach((file) => {
      formData.append('files', file)
      console.log('fileList의 file: ', file)

      fileNames.push(file.name)
    })

    console.log('formData.getAll: ', formData.getAll('files'))

    setInputFileName(fileNames)

    try {
      // axios 연결
      await noticeFileCreate(inputInformId, formData)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteFile = (name: string) => {
    // 파일 삭제
    // FileId 같은 경우는 name과 일치하는 거 찾아서 지우기 axios
    const delFile = inputFile.filter((file) => file.fileName === name)

    const delFileId = delFile[0].fileId

    deleteNotice(inputInformId, delFileId)

    setInputFileName(inputFileName.filter((fileName) => fileName !== name))
  }

  const dontShowNewsLetter = () => {
    const content = <div>가정통신문을 보실 수 없습니다.</div>

    MySwal.fire({
      title: '잠깐!',
      html: content,
    })
  }

  useEffect(() => {
    const fetchDataAndShowNews = async () => {
      try {
        // 데이터를 가져와서 inputNewsLetters에 설정
        const response = await groupNoticeList(groupId)

        setInputNewsLetters(response.data.data.informs)

        // isModifying가 true일 때만 showNews 함수 호출
        if (isModifying) {
          showNews(inputInformId)
        }
      } catch (error) {
        dontShowNewsLetter()
      }
    }
    fetchDataAndShowNews()
  }, [groupId, inputInformId, isModifying])

  return (
    <div className="newsletter-page-container">
      <div className="newsletter-page-title">
        <div className="newsletter-page-title-text-2xl">가정통신문</div>
      </div>
      <div className="newsletter-page-list-box">
        <div className="newsletter-page-list-title">
          <div>번호</div>
          <div>제목</div>
          <div>날짜</div>
        </div>
        <hr />
        {inputNewsLetters?.length > 0 ? (
          inputNewsLetters.map((news, idx) => (
            <div key={news.informId} className="newsletter-item">
              <p className="groupInfo">{idx + 1}</p>
              <p className="groupInfo">
                <button onClick={() => showNews(news.informId)}>
                  {news.title}
                </button>{' '}
              </p>{' '}
              <p className="groupInfo">{newsListDate(news.createdAt)}</p>
            </div>
          ))
        ) : (
          <p className="groupInfo">현재 가정통신문이 없습니다.</p>
        )}
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
            width: '50%',
            height: '50%',
            border: '2px solid #000',
            borderRadius: '10px',
            overflow: 'auto',
            background: '#F5F5DC',
            boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
          },
        }}
      >
        {isModifying ? (
          <div className="flex flex-col gap-2">
            <div className="newsletterModal-edit">
              <div>제목: </div>
              <input type="text" value={inputTitle} onChange={modifyTitle} />
              <div>내용: </div>
              <input
                type="text"
                value={inputContent}
                onChange={modifyContent}
              />
              <div>첨부파일</div>
              <input type="file" multiple onChange={onSaveFiles} />
            </div>
            <div className="flex justify-end">
              <Button
                className="lime normal"
                onClick={onFileUpload}
                label="파일 업로드"
              />
            </div>
            {inputFileName.map((fileName) => (
              <div className="flex items-center self-end">
                {fileName}
                <Button
                  className="xsmall red ml-2"
                  onClick={() => deleteFile(fileName)}
                  label="삭제"
                />
              </div>
            ))}
            <Button
              className="primary normal self-center"
              onClick={sendNewsLetter}
              label="확인"
            />
          </div>
        ) : (
          <>
            <div className="newsletterModal">
              <div>제목: </div>
              <div>{inputTitle}</div>
              <div>작성자: </div>
              <div>{inputWriter}</div>
              <div>내용: </div>
              <div>{inputContent}</div>
            </div>
            <hr />
            {inputFileName?.length > 0 ? (
              inputFileName?.map((file, index) => (
                <button
                  key={index}
                  onClick={() => downloadFile(file)}
                  className="block"
                >
                  <div>파일: {file}</div>
                </button>
              ))
            ) : (
              <p />
            )}
            <div className="flex justify-end">
              <Button
                className="red normal"
                onClick={modifyNewsLetter}
                label="수정하기"
              />
            </div>
          </>
        )}
      </ReactModal>
    </div>
  )
}

export default NewsLetterPage
