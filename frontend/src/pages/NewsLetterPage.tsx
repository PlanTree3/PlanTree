import { useState } from 'react'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const NewsLetterPage = () => {
  const MySwal = withReactContent(Swal)

  interface Notice {
    notificationId: number
    title: string
    groupName: string
    createdAt: Date
  }

  const [inputNewsLetters, setInputNewsLetters] = useState<Notice[]>()

  const newsListDate = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()

    return [year, month, day].join('-')
  }

  const newsList: Notice[] = [
    {
      notificationId: 1,
      title: '플젝이',
      groupName: '벌써',
      createdAt: new Date(),
    },
  ]

  setInputNewsLetters(newsList)

  // useEffect(() => {
  // 여기에 axios 연결하기
  // const newsList: Notice[] = noticeList()
  // const newsList: Notice[] = [
  //   {
  //     notificationId: 1,
  //     title: '플젝이',
  //     groupName: '벌써',
  //     createdAt: new Date(),
  //   },
  // ]
  // setInputNewsLetters(newsList)
  // }, [])

  const showNews = () => {
    interface NewsData {
      title: string
      content: string
      files: [{ fileName: string; fileUrl: string }]
    }

    // const news: data[] = noticeDetail()

    const news: NewsData = {
      title: '플젝이',
      content: '벌써',
      files: [{ fileName: '랄랄라라라', fileUrl: '루루룰루룰' }],
    }

    const content = (
      <>
        <div>{news.title}</div>
        <div>{news.content}</div>
        {news.files.map((file) => {
          return (
            <>
              <div>{file.fileName}</div>
              <div>{file.fileUrl}</div>
            </>
          )
        })}
      </>
    )

    MySwal.fire({
      html: content,
      position: 'center',
      width: '70%',
      heightAuto: false,
      padding: 0,
      confirmButtonText: '확인',
      customClass: {
        confirmButton: 'py-0', // 새로운 클래스 이름을 지정합니다.
      },
    })
  }

  return (
    <>
      <div>가정통신문</div>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>그룹명</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {newsList.map((news, idx) => {
            return (
              <button onClick={showNews()}>
                <tr>
                  <td>{idx}</td>
                  <td>{news.title}</td>
                  <td>{news.groupName}</td>
                  <td>{newsListDate(news.createdAt)}</td>
                </tr>
              </button>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default NewsLetterPage
