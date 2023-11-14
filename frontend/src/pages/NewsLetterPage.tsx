import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
// import { v4 as uuidv4 } from 'uuid'

const NewsLetterPage = () => {
  const { groupId } = useParams()
  const MySwal = withReactContent(Swal)
  // const uuid = uuidv4()

  interface Notice {
    informId: number
    title: string
    groupName: string
    createdAt: Date
  }

  const [inputNewsLetters, setInputNewsLetters] = useState<Notice[]>([
    {
      informId: 1,
      title: '플젝이',
      groupName: '벌써',
      createdAt: new Date(),
    },
  ])

  const newsListDate = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()

    return [year, month, day].join('-')
  }

  // const newsList: Notice[] = [
  //   {
  //     notificationId: 1,
  //     title: '플젝이',
  //     groupName: '벌써',
  //     createdAt: new Date(),
  //   },
  // ]

  // setInputNewsLetters(newsList) 이 부분은 삭제합니다.

  const showNews = (notificationId: number) => {
    console.log(notificationId)

    interface NewsData {
      title: string
      writer: string
      content: string
      // fileId를 string으로 줘도됨?
      files: [{ fileId: string; fileName: string }]
    }

    const news: NewsData = {
      title: '플젝이',
      writer: '오주영',
      content: '벌써',
      files: [{ fileId: '랄랄라라라', fileName: '루루룰루룰' }],
    }

    const content = (
      <>
        <div>{news.title}</div>
        <div>{news.content}</div>
        {news.files.map((file, index) => (
          <div key={index}>
            <div>{file.fileName}</div>
          </div>
        ))}
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
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {inputNewsLetters.map((news, idx) => (
            <tr key={news.informId}>
              <td>{idx + 1}</td>
              <td>
                <button onClick={() => showNews(news.notificationId)}>
                  {news.title}
                </button>
              </td>
              <td>{news.groupName}</td>
              <td>{newsListDate(news.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default NewsLetterPage
