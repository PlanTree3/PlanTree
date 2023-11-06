import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import { Link } from 'react-router-dom'
import './GroupPage.css'
import Button from '@/components/Button/Button'
import yeji1 from '../../public/yeji1.png'
import gijeong1 from '../../public/gijeong1.png'
import forest from '../../public/forest_tmp.png'

const AdminNestPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const GroupsPerPage = 5

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
      <h2>예지의 푸릇푸릇한 둥지</h2>
      <h2>그룹장: 정도현</h2>
      <div className="studentBox">
        <div className="circle-image">
          <img src={yeji1} alt="" />/
        </div>
        <div className="flex flex items-center">
          <text>정예지</text>
        </div>
        <div className="ms-6 flex-col flex justify-center ">
          <text>달성도</text>
          <text>12/25</text>
        </div>
        <div>
          <Link to="/forest/1">
            <img className="forest" src={forest} alt="" />
          </Link>
        </div>
      </div>
      <div className="studentBox">
        <div className="circle-image">
          <img src={gijeong1} alt="" />/
        </div>
        <div className="flex flex items-center">
          <text>신기정</text>
        </div>
        <div className="ms-6 flex-col flex justify-center ">
          <text>달성도</text>
          <text>12/25</text>
        </div>
        <div>
          <Link to="/forest/1">
            <img className="forest" src={forest} alt="" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminNestPage
