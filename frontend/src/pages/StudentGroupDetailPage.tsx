import { Link } from 'react-router-dom'
// import axios from 'axios';
import './GroupPage.css'
import Seal from '../../public/Seal.png'
import yeji1 from '../../public/yeji1.png'
import gijeong1 from '../../public/gijeong1.png'

const StudentGroupDetailPage = () => {
  // const [currentPage, setCurrentPage] = useState(1)

  // const GroupsPerPage = 5
  // const indexOfLastGroup = currentPage * GroupsPerPage
  // const indexOfFirstGroup = indexOfLastGroup - GroupsPerPage
  // const currentGroups = dummyData.data.groups.slice(
  //   indexOfFirstGroup,
  //   indexOfLastGroup,
  // )

  // const totalPages = Math.ceil(dummyData.data.groups.length / GroupsPerPage)

  // const pageNumbers = []
  // for (let i = 1; i <= totalPages; i += 1) {
  //   pageNumbers.push(i)
  // }

  // const changePage = (page: number) => {
  //   setCurrentPage(page)
  // }

  return (
    <div>
      <Link to="/studentGroup">
        <div className="arrow">
          <div className="pt-6">목록으로 돌아가기</div>
        </div>
      </Link>
      <h2>떡잎초 3학년 1반</h2>
      <div className="flex flex-row">
        <img className="h-40" src={Seal} alt="" />
        <div className="groupLeader">
          <text>그룹장: 정도현</text>
        </div>
      </div>
      <div className="studentBox">
        <div className="circle-imageS">
          <img src={yeji1} alt="" />/
        </div>
        <div className="flex flex items-center">
          <text>정예지</text>
        </div>
        <div className="ms-6 flex-col flex justify-center ">
          <text>달성도</text>
          <text>12/25</text>
        </div>
      </div>
      <div className="studentBox">
        <div className="circle-imageS">
          <img src={gijeong1} alt="" />/
        </div>
        <div className="flex flex items-center">
          <text>신기정</text>
        </div>
        <div className="ms-6 flex-col flex justify-center ">
          <text>달성도</text>
          <text>12/25</text>
        </div>
      </div>
      <div className="studentBox">
        <div className="circle-imageS">
          <img src={gijeong1} alt="" />/
        </div>
        <div className="flex flex items-center ">
          <text>신기정</text>
        </div>
        <div className="ms-6 flex-col flex justify-center ">
          <text>달성도</text>
          <text>12/25</text>
        </div>
      </div>
    </div>
  )
}

export default StudentGroupDetailPage
